
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, Calendar, MessageCircle } from 'lucide-react';

export default function CTASection() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/artist/nahis-music-mural-spain.jpg"
            alt="Artist Fiorella Podestá at work creating a mural"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            {language === 'es' 
              ? 'Haz Tu Espacio Inolvidable'
              : 'Make Your Space Unforgettable'
            }
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            {language === 'es' 
              ? 'Invierte en arte original que transforma tu ambiente y cuenta tu historia única'
              : 'Invest in original art that transforms your environment and tells your unique story'
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
                {language === 'es' ? 'Comenzar Mi Proyecto' : 'Start My Project'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button 
              asChild 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm min-w-[220px]"
            >
              <Link href="/services">
                <MessageCircle className="w-5 h-5 mr-2" />
                {language === 'es' ? 'Ver Procesos' : 'View Process'}
              </Link>
            </Button>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/80"
          >
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'es' ? 'Consulta Gratuita' : 'Free Consultation'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Discutamos tu visión sin compromiso'
                  : 'Let\'s discuss your vision with no obligation'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'es' ? 'Proceso Transparente' : 'Transparent Process'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? 'Desde concepto hasta instalación final'
                  : 'From concept to final installation'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'es' ? 'Garantía de Calidad' : 'Quality Guarantee'}
              </h4>
              <p className="text-sm">
                {language === 'es' 
                  ? '30+ años de excelencia artística'
                  : '30+ years of artistic excellence'
                }
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
