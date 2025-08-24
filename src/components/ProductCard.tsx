import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin, ShoppingBag, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from './CartContext';
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
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  onNavigateToCheckout?: () => void;
}

export function ProductCard({ product, onProductClick, onNavigateToCheckout }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Vérifier si le produit est déjà dans le panier
  useEffect(() => {
    const isInCart = items.some(item => item.id === product.id);
    setIsAdded(isInCart);
  }, [items, product.id]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche le clic sur la carte
    setIsLoading(true);

    // Simulation d'un délai pour l'animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      boutique: product.boutique,
      quantity: 1
    });
    
    setIsAdded(true);
    setIsLoading(false);
    
    // Toast de confirmation
    toast.success(`${product.name} ajouté au panier`, {
      description: `Chez ${product.boutique} • ${product.price}`,
      duration: 2000,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAdded) {
      // Si pas encore ajouté, ajouter d'abord
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        boutique: product.boutique,
        quantity: 1
      });
    }

    // Toast de redirection
    toast.success("Redirection vers le checkout", {
      description: `Achat de ${product.name}`,
      duration: 1500,
    });

    // Naviguer vers checkout après un délai
    setTimeout(() => {
      if (onNavigateToCheckout) {
        onNavigateToCheckout();
      }
    }, 500);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-somba-primary/10 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isOnSale && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            Promo
          </Badge>
        )}
        
        {/* Bouton flottant qui change selon l'état */}
        <Button 
          onClick={isAdded ? handleBuyNow : handleAddToCart}
          disabled={isLoading}
          className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 shadow-lg ${
            isAdded 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'bg-white/90 text-somba-primary hover:bg-white'
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isAdded ? (
            <CreditCard className="h-4 w-4" />
          ) : (
            <ShoppingBag className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <CardContent className="p-4">
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{product.rating}</span>
            {product.reviews && (
              <span className="text-xs text-gray-500">({product.reviews})</span>
            )}
          </div>
        )}
        
        <h3 className="font-semibold mb-2 text-somba-primary group-hover:text-somba-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">{product.boutique}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-somba-accent">{product.price}</div>
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">{product.originalPrice}</div>
            )}
          </div>
          
          {/* Bouton principal qui change selon l'état */}
          <Button 
            size="sm" 
            onClick={isAdded ? handleBuyNow : handleAddToCart}
            disabled={isLoading}
            className={`transition-all duration-300 ${
              isAdded 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-somba-accent hover:bg-somba-accent/90 text-white'
            }`}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
            ) : null}
            {isAdded ? 'Acheter' : 'Ajouter'}
          </Button>
        </div>
        
        {/* Indicateur visuel d'ajout */}
        {isAdded && (
          <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Dans le panier
          </div>
        )}
      </CardContent>
    </Card>
  );
}