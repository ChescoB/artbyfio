
'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube, Heart, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/language-context';
import { artistInfo } from '@/lib/artist-data';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, language })
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      icon: Instagram, 
      href: artistInfo?.socialLinks?.instagram, 
      label: 'Instagram' 
    },
    { 
      icon: Facebook, 
      href: artistInfo?.socialLinks?.facebook, 
      label: 'Facebook' 
    },
    { 
      icon: Twitter, 
      href: artistInfo?.socialLinks?.twitter, 
      label: 'Twitter' 
    },
    { 
      icon: Youtube, 
      href: artistInfo?.socialLinks?.youtube, 
      label: 'YouTube' 
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Bio */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2 font-display font-bold text-xl text-primary mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))]" />
              <span>Art by Fio</span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {language === 'es'
                ? 'Artista visual internacional con más de 30 años transformando espacios a través del arte mural.'
                : 'International visual artist with over 30 years transforming spaces through mural art.'}
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">
                {t('footer.newsletter', 'Stay updated with latest works')}
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder', 'Enter your email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  variant="art" 
                  disabled={isSubmitting}
                  className="whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  {t('footer.newsletter.subscribe', 'Subscribe')}
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.portfolio', 'Portfolio')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.about', 'About')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.services', 'Services')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('nav.contact', 'Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === 'es' ? 'Conecta con Fio' : 'Connect with Fio'}
            </h4>
            
            <div className="space-y-3">
              <a 
                href={`mailto:${artistInfo?.email}`}
                className="text-muted-foreground hover:text-primary transition-colors block"
              >
                {artistInfo?.email}
              </a>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('footer.social', 'Follow Fio')}
                </p>
                <div className="flex space-x-3">
                  {socialLinks?.map((social) => (
                    social?.href && (
                      <a
                        key={social?.label}
                        href={social?.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={social?.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground flex items-center">
            © {currentYear} Art by Fio. {t('footer.rights', 'All rights reserved.')}
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span className="ml-1">
              {language === 'es' ? 'Hecho con arte' : 'Made with art'}
            </span>
          </p>
          
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            {language === 'es' 
              ? `${artistInfo?.location} • Disponible mundialmente`
              : `${artistInfo?.location} • Available Worldwide`
            }
          </p>
        </div>
      </div>
    </footer>
  );
}
