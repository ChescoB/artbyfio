
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Calendar, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import MuralsSlideshow from './murals-slideshow';

export default function HeroSection() {
  const { t } = useLanguage();

  const heading = t('hero.tagline', 'Transforming walls into immersive art experiences')
  const subheading = t('hero.subtitle', 'Commission bespoke murals & limited-edition works by Fio')

  const renderStaggeredWords = (text: string) => (
    <span>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 + i * 0.04 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Murals Slideshow Background fetched via API */}
      <MuralsSlideshow />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-24 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            className="font-display font-extrabold text-transparent bg-clip-text mb-6 leading-tight text-4xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,1) 100%)',
              backgroundSize: '200% auto'
            }}
            animate={{ opacity: 1, y: 0, backgroundPosition: ['0% center', '100% center', '0% center'] }}
            transition={{
              y: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
              opacity: { duration: 0.9 },
              backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear' }
            }}
          >
            {heading}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            {renderStaggeredWords(subheading)}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              asChild 
              variant="art" 
              size="xl"
              className="group min-w-[200px] hover:scale-[1.02] transition-transform duration-200"
            >
              <Link href="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                {t('hero.cta.consultation', 'Book a Consultation')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm min-w-[200px] hover:scale-[1.02] transition-transform duration-200"
            >
              <Link href="/portfolio">
                {t('hero.cta.portfolio', 'See Full Portfolio')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Scroll indicator moved outside content wrapper to avoid overlap */}
        </motion.div>
      </div>

      {/* Scroll indicator anchored to section bottom to prevent overlap with CTAs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/70 pointer-events-none"
        >
          <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
