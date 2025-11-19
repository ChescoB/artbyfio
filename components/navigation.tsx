
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/lib/language-context';
import { navigationItems } from '@/lib/artist-data';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <Image
                src="/images/Logo/Fio_net_turquesa-removebg-preview.png"
                alt="Art by Fio Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-primary">
              Art by Fio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href ?? '/'}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item?.href 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {language === 'es' ? (item?.titleEs ?? item?.title) : item?.title}
              </Link>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs"
              title={t('language.toggle', 'Toggle language')}
            >
              <Globe className="h-4 w-4 mr-1" />
              {language?.toUpperCase?.() ?? 'EN'}
            </Button>
            
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                title={t('theme.toggle', 'Toggle theme')}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button asChild variant="art" size="sm">
              <Link href="/contact">
                {t('common.contact_us', 'Contact Us')}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs"
            >
              <Globe className="h-4 w-4" />
            </Button>
            
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border bg-background">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.href}
                  href={item?.href ?? '/'}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    pathname === item?.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {language === 'es' ? (item?.titleEs ?? item?.title) : item?.title}
                </Link>
              ))}
              
              <div className="pt-2 mt-2 border-t border-border">
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] rounded-md text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t('common.contact_us', 'Contact Us')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
