'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  restaurantName: 'Marrakech Palace',
  description:
    'Experience the warmth and flavors of Morocco in the heart of the city. Join us for an unforgettable culinary journey.',
  address: '123 Spice Market Street, Downtown',
  phone: '+1 (555) 123-4567',
  email: 'info@marrakechpalace.com',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Story', href: '/story' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social Links
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com/marrakechpalace', icon: 'facebook' },
    { platform: 'Instagram', href: 'https://instagram.com/marrakechpalace', icon: 'instagram' },
    { platform: 'Twitter', href: 'https://twitter.com/marrakechpalace', icon: 'twitter' },
  ],

  copyright: '© 2024 Marrakech Palace. All rights reserved.',

  // Newsletter
  newsletterTitle: 'Stay Connected',
  newsletterDescription: 'Subscribe for special offers and authentic Moroccan recipes',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  const renderSocialIcon = (iconType: string) => {
    switch (iconType) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Restaurant Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span data-editable="restaurantName">{config.restaurantName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span data-editable="address">{config.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span data-editable="email">{config.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold mb-4 mt-8 text-foreground">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">
              <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="space-y-3"
              data-form-id="692afeda7188dfc157f0dc6c"
            >
              <input
                type="email"
                placeholder={config.newsletterPlaceholder}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-editable="newsletterPlaceholder"
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            <span data-editable="copyright">{config.copyright}</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {config.socialLinks.map((social, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 text-muted-foreground hover:text-primary hover:bg-accent"
                onClick={() => handleLinkClick(social.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
                aria-label={social.platform}
              >
                {renderSocialIcon(social.icon)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
