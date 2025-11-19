
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Calendar, MessageCircle, Palette } from 'lucide-react';

export default function ServicesCTA() {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
            <Palette className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {t('services.cta', 'Request a Quote')}
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {language === 'es' 
              ? 'Comencemos a planificar tu proyecto de arte mural. Cada consulta inicial es gratuita y sin compromiso.'
              : 'Let\'s start planning your mural art project. Every initial consultation is free and without obligation.'
            }
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button 
              asChild 
              variant="art" 
              size="xl"
              className="group min-w-[220px]"
            >
              <Link href="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                {language === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="xl"
              className="min-w-[220px]"
            >
              <Link href="/portfolio">
                <MessageCircle className="w-5 h-5 mr-2" />
                {language === 'es' ? 'Ver Trabajos' : 'View Work'}
              </Link>
            </Button>
          </motion.div>

          {/* Service Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground"
          >
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Evaluación completa sin costo'
                  : 'Complete assessment at no cost'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Garantía 5 Años' : '5-Year Warranty'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Materiales y mano de obra'
                  : 'Materials and workmanship'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Satisfacción 100%' : '100% Satisfaction'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Tu visión, nuestra pasión'
                  : 'Your vision, our passion'
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
