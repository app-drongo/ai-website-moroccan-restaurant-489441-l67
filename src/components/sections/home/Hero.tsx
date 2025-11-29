'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Experience the Magic of Morocco',
  subtitle:
    'Savor authentic tagines, couscous, and traditional dishes prepared with centuries-old recipes and the finest spices from the Atlas Mountains',
  description:
    'From our family kitchen to your table, discover the rich flavors and warm hospitality that make Moroccan cuisine truly extraordinary.',
  ctaText: 'Reserve Your Table',
  ctaHref: '/reservations',
  secondaryCtaText: 'View Menu',
  secondaryCtaHref: '/menu',
  heroImageUrl:
    'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2070&auto=format&fit=crop',
  heroImageAlt: 'Traditional Moroccan tagine with aromatic spices',
  features: ['Authentic Recipes', 'Fresh Daily Ingredients', 'Traditional Atmosphere'],
  rating: '4.9',
  reviewCount: '250+',
  location: 'Downtown Heritage District',
  hours: 'Open Daily 5PM - 11PM',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Rating & Info Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-accent-foreground">
                  <span data-editable="rating">{config.rating}</span>
                </span>
                <span className="text-muted-foreground">
                  (<span data-editable="reviewCount">{config.reviewCount}</span> reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span data-editable="location">{config.location}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span data-editable="hours">{config.hours}</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {config.features.map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-secondary/50 text-secondary-foreground px-4 py-2 text-sm font-medium"
                >
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card className="bg-card border-border overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 font-semibold shadow-lg">
                      Authentic Moroccan
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
