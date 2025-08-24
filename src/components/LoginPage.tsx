import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateHome: () => void;
}

export function LoginPage({
  onNavigateToRegister,
  onNavigateHome,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Connexion réussie !");
        onNavigateHome();
      } else {
        toast.error("Email ou mot de passe incorrect");
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Connexion avec ${provider} bientôt disponible`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-orange-500">SOMBA</span>
              <span className="text-gray-700">shop</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-gray-600"
                >
                  se souvenir de moi
                </Label>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-orange-500 underline"
              >
                mot de passe oublié ?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-medium text-lg"
            >
              {isLoading ? "CONNEXION..." : "CONNEXION"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                OU
              </span>
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

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-gray-900 underline hover:text-orange-500"
            >
              Inscrivez-vous
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="flex-1 bg-gradient-to-br from-orange-100 to-pink-100 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1639945313904-38c513d2f7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Online shopping mobile background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-orange-500/20"></div>
      </div>
    </div>
  );
}