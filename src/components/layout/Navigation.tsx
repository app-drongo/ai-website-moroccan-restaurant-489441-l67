'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'Riad Marrakech',
  brandTagline: 'Authentic Moroccan flavors crafted with tradition and served with passion',
  menuItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#restaurant-menu' },
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
      className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <h1 className="text-xl lg:text-2xl font-bold text-primary">
                <span data-editable="brandName">{config.brandName}</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block max-w-xs truncate">
                <span data-editable="brandTagline">{config.brandTagline}</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {config.menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  data-editable-href={`menuItems[${idx}].href`}
                  data-href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
                >
                  <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
                  className="text-foreground hover:text-primary hover:bg-accent"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Brand */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                      <h2 className="text-lg font-bold text-primary">
                        <span data-editable="brandName">{config.brandName}</span>
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        <span data-editable="brandTagline">{config.brandTagline}</span>
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
                      {config.menuItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.href)}
                          data-editable-href={`menuItems[${idx}].href`}
                          data-href={item.href}
                          className="block w-full text-left px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-200"
                        >
                          <span data-editable={`menuItems[${idx}].label`}>{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
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
