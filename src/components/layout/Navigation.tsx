'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChefHat } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'Riad Marrakech',
  brandTagline: 'Authentic Moroccan Cuisine',
  menuItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#restaurant-menu' },
    { label: 'Contact', href: '#contact' },
  ],
  ctaText: 'Reserve Table',
  ctaHref: '#contact',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-xl">
              <ChefHat className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
                <span data-editable="brandName">{config.brandName}</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block font-medium">
                <span data-editable="brandTagline">{config.brandTagline}</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {config.menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                data-editable-href={`menuItems[${idx}].href`}
                data-href={item.href}
                className="text-foreground hover:text-primary hover:bg-accent/50 transition-all duration-200 px-4 py-2 text-sm font-medium rounded-lg relative group"
              >
                <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg font-medium px-6"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-accent/50 transition-colors duration-200"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-card text-card-foreground w-80 border-l border-border/50"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Brand */}
                  <div className="flex items-center space-x-3 pb-6 border-b border-border/50">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <ChefHat className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        <span data-editable="brandName">{config.brandName}</span>
                      </h2>
                      <p className="text-xs text-muted-foreground font-medium">
                        <span data-editable="brandTagline">{config.brandTagline}</span>
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                      {config.menuItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`menuItems[${idx}].href`}
                          data-href={item.href}
                          className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-200 group"
                        >
                          <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border/50">
                    <Button
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                      size="lg"
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
