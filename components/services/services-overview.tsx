
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { servicesOffered } from '@/lib/artist-data';
import { CheckCircle } from 'lucide-react';

export default function ServicesOverview() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-secondary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {language === 'es' ? 'Servicios Ofrecidos' : 'Services Offered'}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {language === 'es' 
              ? 'Servicios completos de arte mural adaptados a tus necesidades específicas y visión creativa'
              : 'Comprehensive mural art services tailored to your specific needs and creative vision'
            }
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {servicesOffered?.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card className="h-full shadow-art hover:shadow-art-lg transition-all duration-300 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === 'es' ? service?.titleEs : service?.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'es' ? service?.descriptionEs : service?.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">
                      {language === 'es' ? 'Incluye:' : 'Includes:'}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'es' ? service?.featuresEs : service?.features)?.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Service Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-art-lg">
            <Image
              src="/images/artist/commitment-excellence-group.jpg"
              alt="Fiorella Podestá with happy clients posing in front of a vibrant artistic mural featuring an elephant with intricate patterns and floral designs"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-display font-bold">
              {language === 'es' ? 'Compromiso con la Excelencia' : 'Commitment to Excellence'}
            </h3>

            <div className="space-y-4">
              {[
                {
                  titleEn: 'Premium Materials',
                  titleEs: 'Materiales Premium',
                  descEn: 'Only the highest quality paints and materials for longevity and vibrancy',
                  descEs: 'Solo pinturas y materiales de la más alta calidad para longevidad y vitalidad'
                },
                {
                  titleEn: 'Professional Installation',
                  titleEs: 'Instalación Profesional',
                  descEn: 'Experienced team ensures perfect execution and site safety',
                  descEs: 'Equipo experimentado asegura ejecución perfecta y seguridad del sitio'
                },
                {
                  titleEn: 'Collaborative Process',
                  titleEs: 'Proceso Colaborativo',
                  descEn: 'Close collaboration throughout to ensure your vision comes to life',
                  descEs: 'Colaboración estrecha durante todo el proceso para asegurar que tu visión cobre vida'
                }
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-foreground mb-2">
                    {language === 'es' ? item?.titleEs : item?.titleEn}
                  </h4>
                  <p className="text-muted-foreground">
                    {language === 'es' ? item?.descEs : item?.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
