
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';

export default function AboutCTA() {
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
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {t('about.cta', "Let's talk about your space")}
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {language === 'es' 
              ? 'Cada espacio tiene una historia esperando ser contada. Hablemos sobre cómo podemos transformar tu visión en una obra de arte que inspire y conecte.'
              : 'Every space has a story waiting to be told. Let\'s talk about how we can transform your vision into a work of art that inspires and connects.'
            }
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              asChild 
              variant="art" 
              size="xl"
              className="group min-w-[220px]"
            >
              <Link href="/contact">
                <Calendar className="w-5 h-5 mr-2" />
                {language === 'es' ? 'Programar Consulta' : 'Schedule Consultation'}
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
                {language === 'es' ? 'Ver Portafolio' : 'View Portfolio'}
              </Link>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-muted-foreground"
          >
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Experiencia' : 'Experience'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? '30+ años creando arte mural'
                  : '30+ years creating mural art'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Alcance' : 'Reach'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Proyectos en 7 países'
                  : 'Projects across 7 countries'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-foreground">
                {language === 'es' ? 'Impacto' : 'Impact'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? '90+ murales transformadores'
                  : '90+ transformative murals'
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
