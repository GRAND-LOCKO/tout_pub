import React, { useState } from "react";
import { Package, Heart, Award, Eye, Calendar, Truck, CheckCircle, Clock, MapPin, Phone, Mail, User, Edit, CreditCard, Star, ShoppingBag, TrendingUp, Activity, Gift, ChevronRight, ChevronDown, Plus, Bell, Settings, Home, Trash2, Copy, Download, Filter, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { toast } from 'sonner@2.0.3';

interface Order {
  id: string;
  date: string;
  total: string;
  status: 'En cours' | 'Livré' | 'Annulé' | 'En préparation';
  items: OrderItem[];
  trackingSteps: TrackingStep[];
  deliveryAddress: string;
  paymentMethod: string;
  estimatedDelivery?: string;
}

interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  boutique: string;
  size?: string;
  color?: string;
}

interface TrackingStep {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

interface FavoriteItem {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  boutique: string;
  category: string;
  isOnSale?: boolean;
  rating?: number;
}

interface Address {
  id: string;
  label: string;
  fullAddress: string;
  isDefault: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promo' | 'system';
  date: string;
  read: boolean;
}

const mockOrders: Order[] = [
  {
    id: "003",
    date: "15/06/2025",
    total: "15.000 F CFA",
    status: "En cours",
    deliveryAddress: "Cocody, Boulevard Lagunaire, Abidjan",
    paymentMethod: "Mobile Money Orange",
    estimatedDelivery: "Aujourd'hui avant 18h",
    items: [
      {
        id: 1,
        name: "CHAUSSETTE",
        price: "5.000 F CFA",
        quantity: 3,
        image: "https://images.unsplash.com/photo-1598818432717-29f81b9224fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFua2xlJTIwc29ja3N8ZW58MXx8fHwxNzU1NTk0MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        boutique: "ETS EAK",
        size: "39"
      }
    ],
    trackingSteps: [
      { step: 1, title: "Commande confirmée", description: "Votre commande a été confirmée", completed: true, date: "15/06/2025 10:30" },
      { step: 2, title: "Préparation", description: "Préparation de votre commande", completed: true, date: "15/06/2025 14:20" },
      { step: 3, title: "Expédition", description: "Votre commande est en route", completed: true, date: "16/06/2025 08:15" },
      { step: 4, title: "Livraison", description: "Livraison prévue aujourd'hui", completed: false }
    ]
  },
  {
    id: "091",
    date: "17/08/2025",
    total: "520.000 F CFA",
    status: "Livré",
    deliveryAddress: "Plateau, Avenue Chardy, Abidjan",
    paymentMethod: "Espèces",
    items: [
      {
        id: 4,
        name: "PLAYSTATION 5",
        price: "450.000 F CFA",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc1NTUyNDY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
        boutique: "SuperSonic",
        color: "Blanc"
      },
      {
        id: 8,
        name: "MANETTE PS4",
        price: "35.000 F CFA",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc1NTUyNDY5MXww&ixlib=rb-4.1.0&q=80&w=1080",
        boutique: "LA Playstation",
        color: "Noir"
      }
    ],
    trackingSteps: [
      { step: 1, title: "Commande confirmée", description: "Votre commande a été confirmée", completed: true, date: "17/08/2025 09:15" },
      { step: 2, title: "Préparation", description: "Préparation de votre commande", completed: true, date: "17/08/2025 11:30" },
      { step: 3, title: "Expédition", description: "Votre commande est en route", completed: true, date: "18/08/2025 07:45" },
      { step: 4, title: "Livraison", description: "Commande livrée avec succès", completed: true, date: "18/08/2025 16:20" }
    ]
  },
  {
    id: "043",
    date: "23/05/2025",
    total: "320.000 F CFA",
    status: "Livré",
    deliveryAddress: "Marcory, Rue des Jardins, Abidjan",
    paymentMethod: "Mobile Money MTN",
    items: [
      {
        id: 7,
        name: "ORDINATEUR PORTABLE",
        price: "320.000 F CFA",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1754928864131-21917af96dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwxfHx8fDE3NTU1NDU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        boutique: "Zoo Market",
        color: "Argent"
      }
    ],
    trackingSteps: [
      { step: 1, title: "Commande confirmée", description: "Votre commande a été confirmée", completed: true, date: "23/05/2025 14:20" },
      { step: 2, title: "Préparation", description: "Préparation de votre commande", completed: true, date: "23/05/2025 16:45" },
      { step: 3, title: "Expédition", description: "Votre commande est en route", completed: true, date: "24/05/2025 08:30" },
      { step: 4, title: "Livraison", description: "Commande livrée avec succès", completed: true, date: "24/05/2025 11:15" }
    ]
  }
];

const mockFavorites: FavoriteItem[] = [
  {
    id: 2,
    name: "MACHINE À LAVER",
    price: "250.000 F CFA",
    image: "https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnl8ZW58MXx8fHwxNzU1NTI1NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "Zoo Market",
    category: "Électroménager",
    rating: 4.6
  },
  {
    id: 10,
    name: "CASQUE AUDIO",
    price: "50.000 F CFA",
    image: "https://images.unsplash.com/photo-1752055833666-bfca5443136b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzU1NTcwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "Zoo Market",
    category: "Électronique",
    rating: 4.6
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
    rating: 4.5
  },
  {
    id: 14,
    name: "BASKETS NIKE",
    price: "45.000 F CFA",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZXN8ZW58MXx8fHwxNzU1NTk0Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    boutique: "ETS EAK",
    category: "Mode",
    rating: 4.7
  }
];

const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Domicile",
    fullAddress: "Cocody, Boulevard Lagunaire, Résidence Les Palmiers, Villa 15, Abidjan",
    isDefault: true
  },
  {
    id: "2",
    label: "Bureau",
    fullAddress: "Plateau, Avenue Chardy, Immeuble Alpha 2000, 5ème étage, Abidjan",
    isDefault: false
  },
  {
    id: "3",
    label: "Chez mes parents",
    fullAddress: "Marcory, Rue des Jardins, Quartier Résidentiel, Maison 45, Abidjan",
    isDefault: false
  }
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Commande en cours de livraison",
    message: "Votre commande #003 sera livrée aujourd'hui avant 18h",
    type: "order",
    date: "Aujourd'hui",
    read: false
  },
  {
    id: "2",
    title: "Promotion spéciale",
    message: "50% de réduction sur tous les produits électroniques ce weekend",
    type: "promo",
    date: "Hier",
    read: false
  },
  {
    id: "3",
    title: "Commande livrée",
    message: "Votre commande #091 a été livrée avec succès",
    type: "order",
    date: "Il y a 3 jours",
    read: true
  },
  {
    id: "4",
    title: "Nouveau produit ajouté",
    message: "Découvrez les nouveaux smartphones en promotion",
    type: "promo",
    date: "Il y a 5 jours",
    read: true
  }
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const { user } = useAuth();
  const { addItem } = useCart();

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours': return 'bg-yellow-500';
      case 'Livré': return 'bg-green-500';
      case 'Annulé': return 'bg-red-500';
      case 'En préparation': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrackingProgress = (steps: TrackingStep[]) => {
    const completedSteps = steps.filter(step => step.completed).length;
    return (completedSteps / steps.length) * 100;
  };

  const toggleOrderDetails = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handleAddFavoriteToCart = (item: FavoriteItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      boutique: item.boutique,
      quantity: 1
    });
    
    toast.success(`${item.name} ajouté au panier`, {
      description: `Chez ${item.boutique} • ${item.price}`,
      duration: 2000,
    });
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({ ...addr, isDefault: addr.id === id }))
    );
    toast.success("Adresse par défaut mise à jour");
  };

  const handleDeleteAddress = (id: string) => {
    if (addresses.find(addr => addr.id === id)?.isDefault) {
      toast.error("Impossible de supprimer l'adresse par défaut");
      return;
    }
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success("Adresse supprimée");
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = orderFilter === "all" || order.status === orderFilter;
    return matchesSearch && matchesFilter;
  });

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (!user) {
    return (
      <div className="min-h-screen bg-somba-light flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-somba-primary mb-4">Accès restreint</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-somba-light">
      <div className="container mx-auto px-4 py-8">
        {/* Header amélioré */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-somba-primary mb-2">Tableau de bord SOMBA</h1>
              <p className="text-gray-600">Gérez votre compte et suivez vos activités</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="outline" size="sm" className="border-somba-primary text-somba-primary">
                  <Bell className="h-4 w-4" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full p-0 flex items-center justify-center">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Profil utilisateur */}
              <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-somba-primary/10">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-somba-accent text-white">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-somba-primary">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-somba-accent text-xs">Premium</Badge>
                    <Badge variant="outline" className="border-green-600 text-green-600 text-xs">
                      <Activity className="h-2 w-2 mr-1" />
                      Actif
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification en cours */}
        {mockOrders.some(order => order.status === 'En cours') && (
          <div className="mb-8">
            <Card className="border-somba-accent/20 bg-gradient-to-r from-somba-accent/5 to-somba-accent/10">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-somba-accent/20 rounded-full">
                    <Truck className="h-6 w-6 text-somba-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-somba-primary mb-1">🚛 Livraison en cours</h4>
                    <p className="text-sm text-gray-600">Votre commande #003 sera livrée aujourd'hui avant 18h</p>
                  </div>
                  <Button variant="outline" className="border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white">
                    Suivre la livraison
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Cards améliorées */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <Card className="border-somba-primary/10 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Commandes passées</p>
                  <p className="text-3xl font-bold text-somba-primary">03</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2 ce mois
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-somba-accent/20 to-somba-accent/10 rounded-full">
                  <Package className="h-6 w-6 text-somba-accent" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-somba-accent to-somba-accent/50"></div>
            </CardContent>
          </Card>

          <Card className="border-somba-primary/10 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Articles favoris</p>
                  <p className="text-3xl font-bold text-somba-primary">12</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Heart className="h-3 w-3 mr-1" />
                    4 en promo
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-500/50"></div>
            </CardContent>
          </Card>

          <Card className="border-somba-primary/10 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Points fidélité</p>
                  <p className="text-3xl font-bold text-somba-primary">850</p>
                  <p className="text-xs text-somba-accent flex items-center mt-1">
                    <Gift className="h-3 w-3 mr-1" />
                    150 pour cadeau
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-full">
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-500/50"></div>
            </CardContent>
          </Card>

          <Card className="border-somba-primary/10 overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total dépensé</p>
                  <p className="text-3xl font-bold text-somba-primary">855K</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Activity className="h-3 w-3 mr-1" />
                    F CFA
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-full">
                  <CreditCard className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-500/50"></div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation améliorée */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-somba-primary/10 mb-8">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-somba-accent data-[state=active]:text-white"
            >
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-somba-accent data-[state=active]:text-white"
            >
              Commandes
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="data-[state=active]:bg-somba-accent data-[state=active]:text-white"
            >
              Adresses
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-somba-accent data-[state=active]:text-white"
            >
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="ml-1 bg-red-500 text-white text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-somba-accent data-[state=active]:text-white"
            >
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Commandes récentes avec détails */}
              <Card className="border-somba-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-somba-primary">Vos commandes récentes</CardTitle>
                    <Button variant="ghost" size="sm" className="text-somba-accent hover:bg-somba-light">
                      Voir tout <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="border border-somba-primary/10 rounded-lg overflow-hidden">
                        <div 
                          className="flex items-center justify-between p-4 bg-somba-light cursor-pointer hover:bg-somba-gray transition-colors"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-white rounded-lg">
                              <Package className="h-5 w-5 text-somba-accent" />
                            </div>
                            <div>
                              <p className="font-medium text-somba-primary">Commande #{order.id}</p>
                              <p className="text-sm text-gray-500">{order.date}</p>
                              {order.estimatedDelivery && order.status === 'En cours' && (
                                <p className="text-xs text-somba-accent font-medium">{order.estimatedDelivery}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-somba-primary">{order.total}</p>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>
                              {order.status}
                            </Badge>
                            <div className="flex items-center mt-1">
                              {expandedOrders.has(order.id) ? (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Détails de la commande */}
                        {expandedOrders.has(order.id) && (
                          <div className="p-4 bg-white border-t border-somba-primary/10">
                            <div className="space-y-4">
                              {/* Articles commandés */}
                              <div>
                                <h5 className="font-medium text-somba-primary mb-3">Articles commandés</h5>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                                        <ImageWithFallback
                                          src={item.image}
                                          alt={item.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-sm text-somba-primary">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.boutique}</p>
                                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                                          {item.size && <span>Taille: {item.size}</span>}
                                          {item.color && <span>Couleur: {item.color}</span>}
                                          <span>Qty: {item.quantity}</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold text-sm text-somba-accent">{item.price}</p>
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleAddFavoriteToCart(item)}
                                          className="mt-1 text-xs h-6 px-2 border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white"
                                        >
                                          Racheter
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Informations livraison */}
                              <div className="flex items-center justify-between pt-3 border-t border-somba-primary/10">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 text-somba-accent" />
                                  <span className="truncate max-w-48">{order.deliveryAddress}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <CreditCard className="h-4 w-4 text-somba-accent" />
                                  <span>{order.paymentMethod}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Favoris améliorés */}
              <Card className="border-somba-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-somba-primary">Vos favoris</CardTitle>
                    <Button variant="ghost" size="sm" className="text-somba-accent hover:bg-somba-light">
                      Voir tout <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {mockFavorites.slice(0, 4).map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <div className="aspect-square rounded-lg overflow-hidden mb-2 relative">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.isOnSale && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                              Promo
                            </Badge>
                          )}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              size="sm" 
                              onClick={() => handleAddFavoriteToCart(item)}
                              className="bg-white/90 text-somba-primary hover:bg-white p-1"
                            >
                              <ShoppingBag className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <h4 className="font-medium text-sm text-somba-primary mb-1 line-clamp-2">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-somba-accent font-semibold text-sm">{item.price}</p>
                            {item.originalPrice && (
                              <p className="text-xs text-gray-500 line-through">{item.originalPrice}</p>
                            )}
                          </div>
                          {item.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs font-medium">{item.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section statistiques supplémentaires */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-somba-primary/10">
                <CardHeader>
                  <CardTitle className="text-somba-primary">Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-somba-primary">Commande #091 livrée</p>
                        <p className="text-xs text-gray-500">Il y a 3 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-somba-primary">2 articles ajoutés aux favoris</p>
                        <p className="text-xs text-gray-500">Il y a 5 jours</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-somba-accent/20 rounded-full">
                        <Award className="h-4 w-4 text-somba-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-somba-primary">150 points fidélité gagnés</p>
                        <p className="text-xs text-gray-500">Il y a 1 semaine</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-somba-primary/10">
                <CardHeader>
                  <CardTitle className="text-somba-primary">Récompenses disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-somba-accent/10 to-somba-accent/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-somba-primary">Livraison gratuite</h5>
                        <Badge className="bg-somba-accent">200 pts</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">Économisez sur vos frais de livraison</p>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Plus que 150 points</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-somba-primary">Bon d'achat 10%</h5>
                        <Badge variant="outline" className="border-yellow-500 text-yellow-600">500 pts</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">Réduction sur votre prochaine commande</p>
                      <Progress value={34} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Plus que 350 points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Commandes avec recherche et filtres */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-somba-primary/10">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <CardTitle className="text-somba-primary">Historique des commandes</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={orderFilter} onValueChange={setOrderFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Livré">Livrées</SelectItem>
                        <SelectItem value="Annulé">Annulées</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.items.length} article(s)</TableCell>
                        <TableCell className="font-semibold text-somba-accent">{order.total}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Détails
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Détails de commande sélectionnée */}
            {selectedOrder && (
              <Card className="border-somba-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-somba-primary">
                      Détails de la commande #{selectedOrder.id}
                    </CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedOrder(null)}
                      className="border-somba-primary text-somba-primary hover:bg-somba-primary hover:text-white"
                    >
                      Fermer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Informations de commande */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-somba-primary mb-3">Informations de livraison</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-somba-accent" />
                          <span className="text-sm">{selectedOrder.deliveryAddress}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-somba-accent" />
                          <span className="text-sm">Commandé le {selectedOrder.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-somba-accent" />
                          <span className="text-sm">{selectedOrder.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-somba-primary mb-3">Résumé</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Articles ({selectedOrder.items.length})</span>
                          <span className="font-semibold">{selectedOrder.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Livraison</span>
                          <span className="text-green-600">Gratuite</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-somba-primary">
                          <span>Total</span>
                          <span>{selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Articles commandés */}
                  <div>
                    <h4 className="font-semibold text-somba-primary mb-3">Articles commandés</h4>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-somba-light rounded-lg">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-somba-primary">{item.name}</h5>
                            <p className="text-sm text-gray-500">{item.boutique}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              {item.size && <span>Taille: {item.size}</span>}
                              {item.color && <span>Couleur: {item.color}</span>}
                              <span>Quantité: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-somba-accent">{item.price}</p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAddFavoriteToCart(item)}
                              className="mt-2 border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white"
                            >
                              Racheter
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Gestion des adresses */}
          <TabsContent value="addresses" className="space-y-6">
            <Card className="border-somba-primary/10">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-somba-primary">Mes adresses de livraison</CardTitle>
                  <Button className="bg-somba-accent hover:bg-somba-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une adresse
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <Card key={address.id} className={`border-2 ${address.isDefault ? 'border-somba-accent' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4 text-somba-accent" />
                            <h4 className="font-medium text-somba-primary">{address.label}</h4>
                            {address.isDefault && (
                              <Badge className="bg-somba-accent text-white text-xs">Par défaut</Badge>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-somba-accent">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-400 hover:text-red-500"
                              onClick={() => handleDeleteAddress(address.id)}
                              disabled={address.isDefault}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{address.fullAddress}</p>
                        <div className="flex space-x-2">
                          {!address.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white"
                            >
                              Définir par défaut
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-gray-600">
                            <Copy className="h-3 w-3 mr-1" />
                            Copier
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-somba-primary/10">
              <CardHeader>
                <CardTitle className="text-somba-primary">Centre de notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'order' ? 'bg-somba-accent/20' :
                          notification.type === 'promo' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                        }`}>
                          {notification.type === 'order' ? (
                            <Package className="h-4 w-4 text-somba-accent" />
                          ) : notification.type === 'promo' ? (
                            <Gift className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Bell className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-somba-primary'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                        </div>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleMarkNotificationRead(notification.id)}
                              className="border-somba-accent text-somba-accent hover:bg-somba-accent hover:text-white"
                            >
                              Marquer comme lu
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-gray-400">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-somba-primary/10">
                <CardHeader>
                  <CardTitle className="text-somba-primary">Préférences de notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications par email</h4>
                      <p className="text-sm text-gray-600">Recevoir les mises à jour par email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notifications SMS</h4>
                      <p className="text-sm text-gray-600">Recevoir les alertes importantes par SMS</p>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-somba-primary/10">
                <CardHeader>
                  <CardTitle className="text-somba-primary">Informations du compte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom complet</label>
                    <Input value={user.name} className="bg-gray-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input value={user.email} className="bg-gray-50" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <Input placeholder="+225 XX XX XX XX XX" />
                  </div>
                  <Button className="w-full bg-somba-accent hover:bg-somba-accent/90">
                    Mettre à jour le profil
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}