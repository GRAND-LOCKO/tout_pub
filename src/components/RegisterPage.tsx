import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
}

export function RegisterPage({ onNavigateToLogin, onNavigateHome }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (!formData.accountType) {
      toast.error("Veuillez sélectionner un type de compte");
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
        toast.success("Inscription réussie !");
        onNavigateHome();
      } else {
        toast.error("Erreur lors de l'inscription");
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Inscription avec ${provider} bientôt disponible`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="flex-1 bg-gradient-to-br from-teal-600 to-teal-800 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1680117386690-4892ff56caf8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Ecommerce store front background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-700/30"></div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-orange-500">SOMBA</span>
              <span className="text-gray-700">shop</span>
            </h1>
            <p className="text-gray-600 text-lg">Inscription</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="mot de passe"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Select onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <SelectValue placeholder="Sélectionnez votre option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="vendeur">Vendeur</SelectItem>
                    <SelectItem value="partenaire">administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium text-lg"
            >
              {isLoading ? "INSCRIPTION..." : "S'INSCRIRE"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OU</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
            >
              <span>Facebook</span>
            </Button>

            <Button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              variant="outline"
              className="w-full border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-gray-50"
            >
              <span>Google</span>
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-gray-900 underline hover:text-orange-500"
            >
              se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}