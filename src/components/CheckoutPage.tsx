import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { toast } from "sonner@2.0.3";
import { CheckCircle, CreditCard, Smartphone, Banknote } from "lucide-react";

// Simple QR Code component using canvas
const QRCodeCanvas = ({ value, size = 200 }: { value: string; size?: number }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Simple placeholder for QR code - just a pattern
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#ffffff';
        
        // Create a simple pattern that looks like a QR code
        const cellSize = size / 20;
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < 20; j++) {
            if ((i + j) % 3 === 0 || (i * j) % 7 === 0) {
              ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
          }
        }
        
        // Add text in center
        ctx.fillStyle = '#000000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR', size / 2, size / 2 - 10);
        ctx.fillText('CODE', size / 2, size / 2 + 10);
      }
    }
  }, [value, size]);

  return <canvas ref={canvasRef} width={size} height={size} className="border rounded" />;
};

interface CheckoutPageProps {
  onNavigateHome: () => void;
}

export function CheckoutPage({ onNavigateHome }: CheckoutPageProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'qr' | 'success'>('form');
  
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [orderCode, setOrderCode] = useState("");

  const total = getTotalPrice();
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' F CFA';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateOrderCode = () => {
    return 'SOMBA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.paymentMethod) {
      toast.error("Veuillez sélectionner un moyen de paiement");
      return;
    }

    if (formData.paymentMethod === "espece") {
      // Generate QR code for cash payment
      const code = generateOrderCode();
      setOrderCode(code);
      setStep('qr');
    } else {
      // Process other payment methods
      toast.success("Commande confirmée !");
      clearCart();
      setStep('success');
    }
  };

  const handleQRConfirmation = () => {
    toast.success("Commande confirmée ! Présentez ce code QR lors de la livraison.");
    clearCart();
    setStep('success');
  };

  if (step === 'qr') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Banknote className="h-6 w-6 text-green-600" />
              Paiement en Espèces
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <p className="text-gray-600 mb-4">
                Présentez ce code QR au livreur pour confirmer votre commande
              </p>
              
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <QRCodeCanvas 
                    value={`SOMBA-ORDER:${orderCode}:${total}:${user?.email}`}
                    size={200}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-bold text-lg">Code de commande</p>
                <p className="text-2xl font-mono bg-gray-100 p-3 rounded-lg">{orderCode}</p>
                <p className="text-sm text-gray-600">Total à payer : {formatPrice(total)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleQRConfirmation}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                J'ai sauvegardé le code
              </Button>
              <Button 
                onClick={() => setStep('form')}
                variant="outline"
                className="w-full"
              >
                Retour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Commande Confirmée !</h2>
              <p className="text-gray-600">
                Votre commande a été prise en compte. Vous recevrez un email de confirmation.
              </p>
              {orderCode && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm font-medium">Code de suivi :</p>
                  <p className="font-mono text-lg">{orderCode}</p>
                </div>
              )}
            </div>
            <Button onClick={onNavigateHome} className="w-full">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="bg-teal-700 text-white">
            <CardTitle className="text-center text-xl">FINALISER VOTRE COMMANDE</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Coordonnées */}
              <div>
                <h3 className="text-lg font-bold mb-4">Coordonnées</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Moyens de paiement */}
              <div>
                <h3 className="text-lg font-bold mb-4">Moyens de paiement</h3>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="mobile-money" id="mobile-money" />
                    <Label htmlFor="mobile-money" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-5 w-5 text-yellow-600" />
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Mobile Money</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="airtel-money" id="airtel-money" />
                    <Label htmlFor="airtel-money" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-5 w-5 text-red-600" />
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Airtel Money</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="espece" id="espece" />
                    <Label htmlFor="espece" className="flex items-center gap-2 cursor-pointer">
                      <Banknote className="h-5 w-5 text-green-600" />
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Espèce</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Card Details - Show only if not cash payment */}
              {formData.paymentMethod && formData.paymentMethod !== 'espece' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Date d'expiration</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="mt-1"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Résumé de la commande</h4>
                <div className="space-y-1 text-sm">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium"
              >
                Confirmer la commande
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}