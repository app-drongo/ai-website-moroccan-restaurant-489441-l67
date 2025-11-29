'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, Utensils } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_RESTAURANT_MENU = {
  title: 'Authentic Moroccan Menu',
  subtitle:
    'Discover the rich flavors of Morocco, crafted with traditional recipes passed down through generations',
  heroImage: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=1200&h=600&fit=crop',
  heroImageAlt: 'Traditional Moroccan tagine with aromatic spices',
  categories: [
    {
      id: 'appetizers',
      name: 'Appetizers',
      icon: '🥗',
    },
    {
      id: 'mains',
      name: 'Main Dishes',
      icon: '🍲',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      icon: '🍯',
    },
  ],
  menuItems: {
    appetizers: [
      {
        id: '1',
        name: 'Moroccan Mezze Platter',
        description: 'Hummus, baba ganoush, olives, and fresh bread with harissa',
        price: '$18',
        prepTime: '15 min',
        rating: 4.8,
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1544378730-6f3a4b999c8b?w=400&h=300&fit=crop',
      },
      {
        id: '2',
        name: 'Pastilla Rolls',
        description: 'Crispy phyllo pastry filled with spiced chicken and almonds',
        price: '$16',
        prepTime: '20 min',
        rating: 4.9,
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      },
    ],
    mains: [
      {
        id: '3',
        name: 'Traditional Lamb Tagine',
        description: 'Slow-cooked lamb with apricots, almonds, and aromatic spices',
        price: '$32',
        prepTime: '45 min',
        rating: 4.9,
        isVegetarian: false,
        image: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400&h=300&fit=crop',
      },
      {
        id: '4',
        name: 'Vegetable Couscous Royal',
        description: 'Fluffy couscous with seasonal vegetables and chickpeas',
        price: '$24',
        prepTime: '30 min',
        rating: 4.7,
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
      },
    ],
    desserts: [
      {
        id: '5',
        name: 'Baklava Selection',
        description: 'Honey-soaked phyllo pastry with pistachios and almonds',
        price: '$12',
        prepTime: '5 min',
        rating: 4.8,
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
      },
      {
        id: '6',
        name: 'Moroccan Orange Cake',
        description: 'Moist almond cake with orange blossom and cinnamon',
        price: '$10',
        prepTime: '5 min',
        rating: 4.6,
        isVegetarian: true,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      },
    ],
  },
  reservationText: 'Reserve Your Table',
  reservationHref: '/reservations',
} as const;

type RestaurantMenuProps = Partial<typeof DEFAULT_RESTAURANT_MENU>;

export default function Restaurantmenu(props: RestaurantMenuProps) {
  const config = { ...DEFAULT_RESTAURANT_MENU, ...props };
  const navigate = useSmartNavigation();
  const [activeCategory, setActiveCategory] = useState(config.categories[0].id);

  const handleReservation = () => {
    navigate(config.reservationHref);
  };

  return (
    <section id="restaurant-menu" className="bg-background text-foreground py-16 lg:py-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span data-editable="title">{config.title}</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>
            <Button
              size="lg"
              onClick={handleReservation}
              data-editable-href="reservationHref"
              data-href={config.reservationHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
            >
              <Utensils className="mr-2 h-5 w-5" />
              <span data-editable="reservationText">{config.reservationText}</span>
            </Button>
          </div>
          <div className="relative">
            <Image
              src={config.heroImage}
              alt={config.heroImageAlt}
              data-editable-src="heroImage"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-muted">
            {config.categories.map((category, idx) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-sm sm:text-base font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span data-editable={`categories[${idx}].name`}>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {config.categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {config.menuItems[category.id as keyof typeof config.menuItems]?.map(
                  (item, idx) => (
                    <Card
                      key={item.id}
                      className="bg-card text-card-foreground hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-lg leading-tight">
                                <span data-editable={`menuItems.${category.id}[${idx}].name`}>
                                  {item.name}
                                </span>
                              </h3>
                              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                {item.isVegetarian && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 text-xs"
                                  >
                                    Vegetarian
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              <span data-editable={`menuItems.${category.id}[${idx}].description`}>
                                {item.description}
                              </span>
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span data-editable={`menuItems.${category.id}[${idx}].prepTime`}>
                                    {item.prepTime}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span data-editable={`menuItems.${category.id}[${idx}].rating`}>
                                    {item.rating}
                                  </span>
                                </div>
                              </div>
                              <span className="font-bold text-lg text-primary">
                                <span data-editable={`menuItems.${category.id}[${idx}].price`}>
                                  {item.price}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
