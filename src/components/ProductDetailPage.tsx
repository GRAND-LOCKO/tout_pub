import React, { useState } from "react";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Shield, Truck, RotateCcw, MessageCircle, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { toast } from 'sonner@2.0.3';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  boutique: string;
  isOnSale?: boolean;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  sizes?: string[];
  colors?: string[];
  specifications?: { [key: string]: string };
  images?: string[];
}

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onNavigateToCheckout?: () => void;
}

export function ProductDetailPage({ product, relatedProducts, onBack, onProductClick, onNavigateToCheckout }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();

  // Images par défaut pour la galerie (incluant l'image principale + variations)
  const productImages = product.images || [
    product.image,
    product.image.replace('crop=entropy', 'crop=faces'),
    product.image.replace('crop=entropy', 'crop=focalpoint'),
    product.image.replace('w=1080', 'w=800')
  ];

  const handleAddToCart = () => {
    // Validation des options requises
    if (enhancedProduct.sizes && enhancedProduct.sizes.length > 0 && !selectedSize) {
      toast.error("Veuillez sélectionner une taille", {
        description: "Une taille est requise pour ce produit",
        duration: 3000,
      });
      return;
    }

    if (enhancedProduct.colors && enhancedProduct.colors.length > 0 && !selectedColor) {
      toast.error("Veuillez sélectionner une couleur", {
        description: "Une couleur est requise pour ce produit",
        duration: 3000,
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      boutique: product.boutique,
      selectedSize,
      selectedColor,
      quantity
    });

    // Toast de confirmation avec détails
    const optionsText = [
      selectedSize && `Taille: ${selectedSize}`,
      selectedColor && `Couleur: ${selectedColor}`,
      `Quantité: ${quantity}`
    ].filter(Boolean).join(' • ');

    toast.success(`${product.name} ajouté au panier`, {
      description: `Chez ${product.boutique} • ${product.price}${optionsText ? ` • ${optionsText}` : ''}`,
      duration: 3000,
    });
  };

  const handleBuyNow = () => {
    // Validation des options requises
    if (enhancedProduct.sizes && enhancedProduct.sizes.length > 0 && !selectedSize) {
      toast.error("Veuillez sélectionner une taille", {
        description: "Une taille est requise pour ce produit",
        duration: 3000,
      });
      return;
    }

    if (enhancedProduct.colors && enhancedProduct.colors.length > 0 && !selectedColor) {
      toast.error("Veuillez sélectionner une couleur", {
        description: "Une couleur est requise pour ce produit",
        duration: 3000,
      });
      return;
    }

    // Ajouter au panier
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      boutique: product.boutique,
      selectedSize,
      selectedColor,
      quantity
    });

    // Toast de confirmation
    toast.success("Produit ajouté au panier - Redirection vers le checkout", {
      description: `${product.name} • ${product.price}`,
      duration: 2000,
    });

    // Naviguer vers checkout après un délai pour que l'utilisateur voie le toast
    setTimeout(() => {
      if (onNavigateToCheckout) {
        onNavigateToCheckout();
      }
    }, 500);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success(`${product.name} ajouté aux favoris`, {
        description: "Retrouvez ce produit dans votre dashboard",
        duration: 2000,
      });
    } else {
      toast.info(`${product.name} retiré des favoris`, {
        duration: 2000,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ${product.name} chez ${product.boutique} sur SOMBA`,
        url: window.location.href,
      });
    } else {
      // Fallback pour copier l'URL
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier", {
        description: "Vous pouvez maintenant partager ce produit",
        duration: 2000,
      });
    }
  };

  // Données enrichies pour la démo
  const enhancedProduct = {
    ...product,
    description: product.description || `${product.name} est un produit de qualité supérieure disponible chez ${product.boutique}. Conçu pour offrir performance et durabilité, cet article répond aux standards les plus exigeants. Profitez d'une expérience d'achat exceptionnelle avec livraison rapide et service client dédié.`,
    rating: product.rating || 4.5,
    reviews: product.reviews || Math.floor(Math.random() * 500) + 50,
    inStock: product.inStock !== false,
    sizes: product.sizes || [],
    colors: product.colors || [],
    specifications: product.specifications || {
      "Marque": product.boutique,
      "Catégorie": product.category,
      "Disponibilité": "En stock",
      "Garantie": "1 an"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-somba-primary/10 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="text-somba-primary hover:bg-somba-light">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleToggleFavorite} 
                className="text-somba-primary hover:bg-somba-light"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className="text-somba-primary hover:bg-somba-light"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={productImages[selectedImage]}
                alt={enhancedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-somba-accent' 
                      : 'border-gray-200 hover:border-somba-primary/30'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${enhancedProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            {/* En-tête produit */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-somba-accent text-white">
                  {enhancedProduct.boutique}
                </Badge>
                {enhancedProduct.isOnSale && (
                  <Badge variant="destructive">Promotion</Badge>
                )}
                {enhancedProduct.inStock && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    En stock
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-somba-primary mb-4">
                {enhancedProduct.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(enhancedProduct.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-medium">{enhancedProduct.rating}</span>
                  <span className="text-gray-500">({enhancedProduct.reviews} avis)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-bold text-somba-accent">
                  {enhancedProduct.price}
                </div>
                {enhancedProduct.originalPrice && (
                  <div className="text-xl text-gray-500 line-through">
                    {enhancedProduct.originalPrice}
                  </div>
                )}
              </div>
            </div>

            {/* Options de sélection */}
            <div className="space-y-4">
              {enhancedProduct.sizes && enhancedProduct.sizes.length > 0 && (
                <div>
                  <label className="block font-medium mb-2 text-somba-primary">
                    Taille {enhancedProduct.sizes.length > 0 && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {enhancedProduct.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size 
                          ? "bg-somba-accent hover:bg-somba-accent/90" 
                          : "border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {enhancedProduct.colors && enhancedProduct.colors.length > 0 && (
                <div>
                  <label className="block font-medium mb-2 text-somba-primary">
                    Couleur {enhancedProduct.colors.length > 0 && <span className="text-red-500">*</span>}
                  </label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-48 border-somba-primary/30">
                      <SelectValue placeholder="Choisir une couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      {enhancedProduct.colors.map((color) => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Quantité */}
              <div>
                <label className="block font-medium mb-2 text-somba-primary">Quantité</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-somba-accent hover:bg-somba-accent/90 text-white py-3 text-lg"
                size="lg"
                disabled={!enhancedProduct.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {enhancedProduct.inStock ? 'Ajouter au panier' : 'Produit indisponible'}
              </Button>
              <Button 
                onClick={handleBuyNow}
                variant="outline" 
                className="w-full border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white py-3"
                disabled={!enhancedProduct.inStock}
              >
                {enhancedProduct.inStock ? 'Acheter maintenant' : 'Produit indisponible'}
              </Button>
            </div>

            {/* Informations sur les options requises */}
            {((enhancedProduct.sizes && enhancedProduct.sizes.length > 0) || 
              (enhancedProduct.colors && enhancedProduct.colors.length > 0)) && (
              <div className="text-sm text-gray-600 bg-somba-light p-3 rounded-lg">
                <span className="text-red-500">*</span> Options requises avant l'ajout au panier
              </div>
            )}

            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-somba-primary/10">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-somba-accent" />
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-somba-accent" />
                <span>Garantie 1 an</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-somba-accent" />
                <span>Retour gratuit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets d'information */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-somba-light">
              <TabsTrigger value="description" className="data-[state=active]:bg-somba-accent data-[state=active]:text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-somba-accent data-[state=active]:text-white">
                Caractéristiques
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-somba-accent data-[state=active]:text-white">
                Avis ({enhancedProduct.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {enhancedProduct.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(enhancedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-somba-primary">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">{enhancedProduct.rating} sur 5</span>
                  </div>
                  <Button variant="outline" className="border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Écrire un avis
                  </Button>
                </div>
                <p className="text-gray-500">Les avis clients apparaîtront ici.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Articles de la même boutique */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-somba-primary mb-2">
                  Plus de produits chez {enhancedProduct.boutique}
                </h2>
                <p className="text-gray-600">Découvrez d'autres articles de cette boutique</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-somba-primary/10" onClick={() => onProductClick(relatedProduct)}>
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.isOnSale && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        Promo
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-somba-primary mb-2 group-hover:text-somba-accent transition-colors line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-somba-accent">{relatedProduct.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}