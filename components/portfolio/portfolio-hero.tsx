
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { Palette, Award, MapPin } from 'lucide-react';

export default function PortfolioHero() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {t('portfolio.title', 'Portfolio')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('portfolio.subtitle', 'Explore my collection of transformative mural art')}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-primary">90+</div>
              <div className="text-muted-foreground text-sm">
                {language === 'es' ? 'Murales Creados' : 'Murals Created'}
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-primary">7</div>
              <div className="text-muted-foreground text-sm">
                {t('common.countries', 'Countries')}
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-primary">30+</div>
              <div className="text-muted-foreground text-sm">
                {t('common.years_experience', 'Years Experience')}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
