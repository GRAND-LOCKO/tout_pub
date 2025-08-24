import { useState } from "react";
import { NavigationHeader } from "./components/NavigationHeader";
import { FilterBar } from "./components/FilterBar";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { StoresPage } from "./components/StoresPage";
import { HomePage } from "./components/HomePage";
import { DashboardPage } from "./components/DashboardPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { Footer } from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

type CurrentPage = 'home' | 'stores' | 'articles' | 'dashboard' | 'product-detail' | 'login' | 'register' | 'checkout';

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

const initialProducts: Product[] = [
  {
    id: 1,
    name: "CHAUSSETTE",
    price: "5.000 F CFA",
    image: "https://images.unsplash.com/photo-1598818432717-29f81b9224fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFua2xlJTIwc29ja3N8ZW58MXx8fHwxNzU1NTk0MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "ETS EAK",
    category: "Mode",
    rating: 4.2,
    reviews: 56,
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  },
  {
    id: 2,
    name: "MACHINE À LAVER",
    price: "250.000 F CFA",
    image: "https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnl8ZW58MXx8fHwxNzU1NTI1NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électroménager",
    rating: 4.6,
    reviews: 124,
    colors: ["Blanc", "Gris"]
  },
  {
    id: 3,
    name: "FER À REPASSER",
    price: "25.000 F CFA",
    image: "https://images.unsplash.com/photo-1731339792557-47583fea380a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwY2xvdGhpbmclMjBhcHBsaWFuY2V8ZW58MXx8fHwxNzU1NTk0MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électroménager",
    rating: 4.1,
    reviews: 89,
    colors: ["Noir", "Blanc", "Rouge"]
  },
  {
    id: 4,
    name: "PLAYSTATION 5",
    price: "450.000 F CFA",
    image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc1NTUyNDY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "SuperSonic",
    category: "Gaming",
    rating: 4.9,
    reviews: 312,
    colors: ["Blanc", "Noir"]
  },
  {
    id: 5,
    name: "CLIMATISATION",
    price: "180.000 F CFA",
    image: "https://images.unsplash.com/photo-1647022528152-52ed9338611d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjB1bml0fGVufDF8fHx8MTc1NTU5NDI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électroménager",
    rating: 4.4,
    reviews: 78,
    colors: ["Blanc", "Gris"]
  },
  {
    id: 6,
    name: "VÉLO",
    price: "85.000 F CFA",
    image: "https://images.unsplash.com/photo-1667578608536-ba216bafb195?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwdmludGFnZXxlbnwxfHx8fDE3NTU1OTQyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Sport",
    rating: 4.3,
    reviews: 45,
    sizes: ["S", "M", "L"]
  },
  {
    id: 7,
    name: "ORDINATEUR PORTABLE",
    price: "320.000 F CFA",
    image: "https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTU1NDU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électronique",
    rating: 4.7,
    reviews: 156,
    colors: ["Argent", "Gris", "Noir"]
  },
  {
    id: 8,
    name: "MANETTE PS4",
    price: "35.000 F CFA",
    image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc1NTUyNDY5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "LA Playstation",
    category: "Gaming",
    rating: 4.5,
    reviews: 234,
    colors: ["Noir", "Blanc", "Rouge", "Bleu"]
  },
  {
    id: 9,
    name: "SAMSUNG GALAXY NOTE EDGE",
    price: "165.000 F CFA",
    image: "https://images.unsplash.com/photo-1698311427625-c9d99d089e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwcGhvbmUlMjBtb2JpbGV8ZW58MXx8fHwxNzU1NTk0Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électronique",
    rating: 4.2,
    reviews: 98,
    colors: ["Noir", "Blanc", "Or"]
  },
  {
    id: 10,
    name: "CASQUE AUDIO",
    price: "50.000 F CFA",
    image: "https://images.unsplash.com/photo-1752055833666-bfca5443136b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzU1NTcwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électronique",
    rating: 4.6,
    reviews: 187,
    colors: ["Noir", "Blanc", "Rouge"]
  },
  {
    id: 11,
    name: "TABLETTE IPAD",
    price: "280.000 F CFA",
    image: "https://images.unsplash.com/photo-1627826436180-178c3b10767c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBpcGFkJTIwZGV2aWNlfGVufDF8fHx8MTc1NTU3MjE2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Zoo Market",
    category: "Électronique",
    rating: 4.8,
    reviews: 145,
    colors: ["Gris", "Argent", "Or"]
  },
  {
    id: 12,
    name: "TV SMART",
    price: "350.000 F CFA",
    image: "https://images.unsplash.com/photo-1601944177325-f8867652837f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHR2JTIwdGVsZXZpc2lvbnxlbnwxfHx8fDE3NTU0OTQzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    boutique: "Coshop",
    category: "Électronique",
    rating: 4.4,
    reviews: 89,
    sizes: ["32\"", "43\"", "55\"", "65\""]
  },
  {
    id: 13,
    name: "SMARTPHONE XIAOMI",
    price: "120.000 F CFA",
    originalPrice: "150.000 F CFA",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx4aWFvbWklMjBwaG9uZXxlbnwxfHx8fDE3NTU1OTQyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "Zoo Market",
    category: "Électronique",
    isOnSale: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 14,
    name: "BASKETS NIKE",
    price: "45.000 F CFA",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXN8ZW58MXx8fHwxNzU1NTk0Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "ETS EAK",
    category: "Mode",
    rating: 4.7,
    reviews: 189
  },
  {
    id: 15,
    name: "MICRO-ONDES",
    price: "75.000 F CFA",
    image: "https://images.unsplash.com/photo-1582027354208-b3acb3b10024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3dhdmV8ZW58MXx8fHwxNzU1NTk0Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "Coshop",
    category: "Électroménager",
    rating: 4.3,
    reviews: 67
  },
  {
    id: 16,
    name: "NINTENDO SWITCH",
    price: "280.000 F CFA",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaW50ZW5kbyUyMHN3aXRjaHxlbnwxfHx8fDE3NTU1OTQyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "LA Playstation",
    category: "Gaming",
    rating: 4.8,
    reviews: 156
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [products] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [displayedProductsCount, setDisplayedProductsCount] = useState(12);

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
    if (page !== 'product-detail') {
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('articles');
    setDisplayedProductsCount(12);
  };

  const handleLoadMore = () => {
    setDisplayedProductsCount(prev => prev + 8);
  };

  const handleViewAllProducts = () => {
    setSelectedCategory("Tous");
    setCurrentPage('articles');
    setDisplayedProductsCount(12);
  };

  const handleNavigateToCheckout = () => {
    setCurrentPage('checkout');
  };

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory === "Tous" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const displayedProducts = filteredProducts.slice(0, displayedProductsCount);

  // Produits de la même boutique pour la page détail
  const getRelatedProducts = (product: Product) => {
    return products.filter(p => 
      p.boutique === product.boutique && p.id !== product.id
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToCheckout={handleNavigateToCheckout}
            onCategoryClick={handleCategoryClick}
            onProductClick={handleProductClick}
            onViewAllProducts={handleViewAllProducts}
            products={products}
          />
        );
      case 'stores':
        return <StoresPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            relatedProducts={getRelatedProducts(selectedProduct)}
            onBack={() => setCurrentPage('articles')}
            onProductClick={handleProductClick}
            onNavigateToCheckout={handleNavigateToCheckout}
          />
        ) : null;
      case 'login':
        return (
          <LoginPage 
            onNavigateToRegister={() => setCurrentPage('register')}
            onNavigateHome={() => setCurrentPage('home')}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateHome={() => setCurrentPage('home')}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage 
            onNavigateHome={() => setCurrentPage('home')}
          />
        );
      case 'articles':
        return (
          <main className="container mx-auto px-4 py-8 min-h-screen bg-somba-light">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-somba-primary mb-2">Catalogue des produits</h1>
              <p className="text-gray-600">Découvrez notre sélection de produits de qualité</p>
            </div>
            
            <FilterBar />
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-somba-primary mb-3">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {['Tous', 'Électronique', 'Mode', 'Gaming', 'Électroménager', 'Sport'].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? 'bg-somba-accent hover:bg-somba-accent/90 text-white' 
                      : 'border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results info */}
            <div className="mb-6">
              <p className="text-somba-primary">
                <span className="font-semibold">{filteredProducts.length}</span> article(s) 
                {selectedCategory !== "Tous" && (
                  <span> dans la catégorie <strong>{selectedCategory}</strong></span>
                )}
              </p>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onProductClick={handleProductClick}
                  onNavigateToCheckout={handleNavigateToCheckout}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {displayedProductsCount < filteredProducts.length && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleLoadMore}
                  variant="outline" 
                  className="px-8 py-2 border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
                >
                  Voir plus ({filteredProducts.length - displayedProductsCount} articles restants)
                </Button>
              </div>
            )}

            {/* No more products message */}
            {displayedProductsCount >= filteredProducts.length && filteredProducts.length > 12 && (
              <div className="text-center text-gray-500">
                <p>Tous les articles ont été affichés</p>
              </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <div className="w-24 h-24 mx-auto bg-somba-light rounded-full flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>
                </div>
                <h3 className="font-medium text-somba-primary mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-500 mb-4">
                  Essayez de sélectionner une autre catégorie
                </p>
                <Button 
                  onClick={() => setSelectedCategory("Tous")}
                  className="bg-somba-accent hover:bg-somba-accent/90"
                >
                  Voir tous les produits
                </Button>
              </div>
            )}
          </main>
        );
      default:
        return (
          <HomePage 
            onNavigateToLogin={() => setCurrentPage('login')}
            onNavigateToCheckout={handleNavigateToCheckout}
            onCategoryClick={handleCategoryClick}
            onProductClick={handleProductClick}
            onViewAllProducts={handleViewAllProducts}
            products={products}
          />
        );
    }
  };

  const showHeaderAndFooter = !['login', 'register', 'product-detail'].includes(currentPage);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          {showHeaderAndFooter && (
            <NavigationHeader 
              currentPage={currentPage as any} 
              onNavigate={handleNavigate}
            />
          )}
          
          {renderCurrentPage()}
          
          {showHeaderAndFooter && <Footer />}
          
          {/* Toast Notifications */}
          <Toaster position="top-right" />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}