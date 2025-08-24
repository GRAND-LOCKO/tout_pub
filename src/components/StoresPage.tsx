import React, { useState } from "react";
import { Search, MapPin, Star, Phone, Clock, Filter, Grid, List } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Store {
  id: number;
  name: string;
  image: string;
  description: string;
  location: {
    zone: string;
    address: string;
    city: string;
  };
  rating: number;
  reviews: number;
  categories: string[];
  phone: string;
  hours: string;
  delivery: boolean;
  verified: boolean;
}

const stores: Store[] = [
  {
    id: 1,
    name: "Zoo Market",
    image: "https://images.unsplash.com/photo-1556909743-f6210aadb7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yZSUyMGZyb250JTIwc2hvcHxlbnwxfHx8fDE3NTU2ODQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Votre destination pour l'électronique et les appareils ménagers de qualité",
    location: {
      zone: "Cocody",
      address: "Boulevard Lagunaire",
      city: "Abidjan"
    },
    rating: 4.5,
    reviews: 234,
    categories: ["Électronique", "Électroménager", "Gaming"],
    phone: "+225 01 02 03 04 05",
    hours: "8h00 - 19h00",
    delivery: true,
    verified: true
  },
  {
    id: 2,
    name: "ETS EAK",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHN0b3JlJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTU2ODQzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Mode et accessoires tendance pour toute la famille",
    location: {
      zone: "Plateau",
      address: "Avenue Chardy",
      city: "Abidjan"
    },
    rating: 4.2,
    reviews: 156,
    categories: ["Mode", "Accessoires", "Chaussures"],
    phone: "+225 07 08 09 10 11",
    hours: "9h00 - 18h30",
    delivery: true,
    verified: true
  },
  {
    id: 3,
    name: "SuperSonic",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzdG9yZSUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc1NTY4NDM1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Spécialiste gaming et high-tech de référence",
    location: {
      zone: "Marcory",
      address: "Rue des Jardins",
      city: "Abidjan"
    },
    rating: 4.8,
    reviews: 89,
    categories: ["Gaming", "High-tech", "Accessoires"],
    phone: "+225 05 06 07 08 09",
    hours: "10h00 - 20h00",
    delivery: true,
    verified: true
  },
  {
    id: 4,
    name: "Coshop",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Supermarché moderne avec tous vos produits du quotidien",
    location: {
      zone: "Treichville",
      address: "Boulevard de Marseille",
      city: "Abidjan"
    },
    rating: 4.3,
    reviews: 312,
    categories: ["Alimentaire", "Cosmétiques", "Maison"],
    phone: "+225 20 21 22 23 24",
    hours: "7h00 - 21h00",
    delivery: true,
    verified: true
  },
  {
    id: 5,
    name: "LA Playstation",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwc3RvcmUlMjBhcmNhZGV8ZW58MXx8fHwxNzU1Njg0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Boutique dédiée aux jeux vidéo et consoles",
    location: {
      zone: "Adjamé",
      address: "Marché d'Adjamé",
      city: "Abidjan"
    },
    rating: 4.1,
    reviews: 67,
    categories: ["Gaming", "Consoles", "Jeux"],
    phone: "+225 40 41 42 43 44",
    hours: "9h00 - 19h00",
    delivery: false,
    verified: false
  }
];

interface StoresPageProps {
  onStoreClick?: (store: Store) => void;
}

export function StoresPage({ onStoreClick }: StoresPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const zones = ["all", "Cocody", "Plateau", "Marcory", "Treichville", "Adjamé", "Yopougon"];
  const categories = ["all", "Électronique", "Mode", "Gaming", "Alimentaire", "Électroménager"];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.location.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === "all" || store.location.zone === selectedZone;
    const matchesCategory = selectedCategory === "all" || 
                           store.categories.some(cat => cat === selectedCategory);
    
    return matchesSearch && matchesZone && matchesCategory;
  });

  const handleStoreClick = (store: Store) => {
    if (onStoreClick) {
      onStoreClick(store);
    }
  };

  return (
    <div className="min-h-screen bg-somba-light">
      {/* Hero Section */}
      <div className="bg-somba-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Découvrez nos Boutiques Partenaires</h1>
            <p className="text-xl opacity-90">Trouvez les meilleurs magasins près de chez vous</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Rechercher par nom de boutique, zone ou adresse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base border-somba-primary/30 focus:border-somba-accent"
                  />
                </div>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger className="md:w-48 h-12 border-somba-primary/30">
                    <SelectValue placeholder="Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map(zone => (
                      <SelectItem key={zone} value={zone}>
                        {zone === "all" ? "Toutes les zones" : zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="md:w-48 h-12 border-somba-primary/30">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "Toutes catégories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-somba-primary">
              <span className="font-semibold">{filteredStores.length}</span> boutique(s) trouvée(s)
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Filtres actifs:</span>
              {selectedZone !== "all" && (
                <Badge variant="secondary" className="bg-somba-accent text-white">
                  {selectedZone}
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-somba-accent text-white">
                  {selectedCategory}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" 
                ? "bg-somba-accent hover:bg-somba-accent/90" 
                : "border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
              }
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" 
                ? "bg-somba-accent hover:bg-somba-accent/90" 
                : "border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
              }
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stores Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredStores.map((store) => (
            <Card 
              key={store.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-somba-primary/10 cursor-pointer group"
              onClick={() => handleStoreClick(store)}
            >
              <div className={viewMode === "list" ? "flex" : ""}>
                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <div className="relative h-48 w-full">
                    <ImageWithFallback
                      src={store.image}
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {store.verified && (
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        Vérifié
                      </Badge>
                    )}
                    {store.delivery && (
                      <Badge className="absolute top-2 left-2 bg-somba-accent">
                        Livraison
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-somba-primary group-hover:text-somba-accent transition-colors">{store.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{store.rating}</span>
                        <span className="text-xs text-gray-500">({store.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{store.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {store.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs border-somba-accent text-somba-accent">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 text-somba-accent" />
                        <span>{store.location.address}, {store.location.zone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-somba-accent" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4 text-somba-accent" />
                        <span>{store.hours}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-somba-accent hover:bg-somba-accent/90">
                        Voir les produits
                      </Button>
                      <Button variant="outline" className="border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white">
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Aucune boutique trouvée</h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou de naviguer dans toutes les catégories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}