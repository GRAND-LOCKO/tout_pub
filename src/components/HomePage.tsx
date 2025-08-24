import React from "react";
import { ArrowRight, Star, ShoppingBag, Truck, Shield, Headphones, TrendingUp, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { HeroCarousel } from "./HeroCarousel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToCheckout: () => void;
  onCategoryClick: (category: string) => void;
  onProductClick: (product: Product) => void;
  onViewAllProducts: () => void;
  products: Product[];
}

const categories = [
  {
    id: 1,
    name: "Électronique",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljcyUyMGRldmljZXN8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "2,500+ produits"
  },
  {
    id: 2,
    name: "Mode",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "1,800+ produits"
  },
  {
    id: 3,
    name: "Électroménager",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3J8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "3,200+ produits"
  },
  {
    id: 4,
    name: "Sport",
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "900+ produits"
  },
  {
    id: 5,
    name: "Gaming",
    icon: "🎮",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTU2ODQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "1,100+ produits"
  },
  {
    id: 6,
    name: "Beauté",
    icon: "💄",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NTU2ODQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    count: "750+ produits"
  }
];

const services = [
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Livraison sous 24h à Abidjan"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Transactions 100% sécurisées"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Assistance client dédiée"
  },
  {
    icon: TrendingUp,
    title: "Meilleurs Prix",
    description: "Prix compétitifs garantis"
  }
];

export function HomePage({ 
  onNavigateToLogin, 
  onNavigateToCheckout, 
  onCategoryClick,
  onProductClick,
  onViewAllProducts,
  products 
}: HomePageProps) {
  // Sélectionner quelques produits tendance
  const featuredProducts = products
    .filter(p => p.rating && p.rating >= 4.5)
    .slice(0, 4)
    .map(product => ({
      ...product,
      rating: product.rating || 4.5,
      reviews: product.reviews || Math.floor(Math.random() * 200) + 50
    }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Quick Stats */}
      <div className="bg-somba-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-somba-accent">{products.length}+</div>
              <div className="text-sm opacity-90">Produits</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-somba-accent">500+</div>
              <div className="text-sm opacity-90">Boutiques</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-somba-accent">50,000+</div>
              <div className="text-sm opacity-90">Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-somba-accent">98%</div>
              <div className="text-sm opacity-90">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 bg-somba-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-somba-primary mb-4">Explorez nos Catégories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez une large gamme de produits de qualité dans toutes les catégories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white hover:bg-somba-accent hover:text-white"
                onClick={() => onCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-somba-accent/20 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-white">{category.name}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-white/80">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-somba-primary mb-2">Produits Tendance</h2>
              <p className="text-gray-600">Les articles les plus populaires du moment</p>
            </div>
            <Button 
              className="bg-somba-accent hover:bg-somba-accent/90 text-white"
              onClick={onViewAllProducts}
            >
              Voir tout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-somba-primary/10 cursor-pointer"
                onClick={() => onProductClick(product)}
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
                  <Button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-somba-primary hover:bg-white p-2">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
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
                    <Button size="sm" className="bg-somba-accent hover:bg-somba-accent/90 text-white">
                      Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-somba-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-somba-primary mb-4">Pourquoi Choisir SOMBA ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir la meilleure expérience d'achat en ligne
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-somba-accent text-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-somba-primary mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-somba-primary to-somba-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à Découvrir SOMBA ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et découvrez nos boutiques partenaires
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-somba-accent hover:bg-somba-accent/90 text-white px-8 py-3">
              Explorer les Boutiques
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-somba-primary px-8 py-3"
              onClick={onNavigateToLogin}
            >
              Créer un Compte
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}