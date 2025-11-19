
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { MessageCircle, Palette, Hammer, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    titleEn: 'Initial Consultation',
    titleEs: 'Consulta Inicial',
    descEn: 'We discuss your vision, space requirements, timeline, and budget to ensure perfect alignment.',
    descEs: 'Discutimos tu visión, requisitos del espacio, cronograma y presupuesto para asegurar alineación perfecta.',
    duration: '1-2 hours',
    durationEs: '1-2 horas'
  },
  {
    step: 2,
    icon: Palette,
    titleEn: 'Concept & Design',
    titleEs: 'Concepto y Diseño',
    descEn: 'Custom design creation with sketches, color palettes, and detailed project proposal.',
    descEs: 'Creación de diseño personalizado con bocetos, paletas de colores y propuesta detallada del proyecto.',
    duration: '1-2 weeks',
    durationEs: '1-2 semanas'
  },
  {
    step: 3,
    icon: Hammer,
    titleEn: 'Production',
    titleEs: 'Producción',
    descEn: 'Professional execution with premium materials, regular updates, and site safety protocols.',
    descEs: 'Ejecución profesional con materiales premium, actualizaciones regulares y protocolos de seguridad del sitio.',
    duration: '1-4 weeks',
    durationEs: '1-4 semanas'
  },
  {
    step: 4,
    icon: CheckCircle,
    titleEn: 'Installation & Finish',
    titleEs: 'Instalación y Acabado',
    descEn: 'Final touches, quality inspection, and maintenance guidelines for long-lasting beauty.',
    descEs: 'Toques finales, inspección de calidad y pautas de mantenimiento para belleza duradera.',
    duration: '1-3 days',
    durationEs: '1-3 días'
  }
];

export default function ProcessSection() {
  const { t, language } = useLanguage();
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
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--art-teal))]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--art-coral))]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[hsl(var(--art-teal))]/10 to-[hsl(var(--art-coral))]/10 rounded-full text-sm font-semibold text-primary">
              {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
          >
            {t('services.process.title', 'Our Process')}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {language === 'es' 
              ? 'Un proceso probado y transparente que garantiza resultados excepcionales en cada proyecto'
              : 'A proven, transparent process that ensures exceptional results in every project'
            }
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {processSteps?.map((step, index) => {
            const IconComponent = step?.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <Card className="overflow-hidden shadow-art hover:shadow-art-lg transition-all duration-500 border-0 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--art-teal))]/0 via-[hsl(var(--art-teal))]/5 to-[hsl(var(--art-coral))]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                      {/* Step Number & Icon - Always Left on Desktop */}
                      <div className={`lg:col-span-3 bg-gradient-to-br from-[hsl(var(--art-teal))]/10 via-[hsl(var(--art-coral))]/10 to-[hsl(var(--art-teal))]/5 p-8 flex flex-col items-center justify-center relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        {/* Decorative circle */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <div className="w-48 h-48 rounded-full border-2 border-primary"></div>
                        </div>
                        
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[hsl(var(--art-teal))] via-primary to-[hsl(var(--art-coral))] flex items-center justify-center text-white font-bold text-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            {step?.step}
                          </div>
                          <div className="w-16 h-16 mx-auto rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-primary/20">
                            <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`lg:col-span-9 p-8 lg:p-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="space-y-4">
                          <div className="flex items-start justify-between flex-wrap gap-4">
                            <h3 className="text-3xl lg:text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
                              {language === 'es' ? step?.titleEs : step?.titleEn}
                            </h3>
                            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                              <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-semibold text-primary">
                                {language === 'es' ? step?.durationEs : step?.duration}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {language === 'es' ? step?.descEs : step?.descEn}
                          </p>

                          {/* Progress indicator */}
                          <div className="pt-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))]"
                                  initial={{ width: 0 }}
                                  animate={inView ? { width: `${((step?.step) / processSteps.length) * 100}%` } : { width: 0 }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground">
                                {language === 'es' ? 'Paso' : 'Step'} {step?.step}/{processSteps.length}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connection Line with animated dot */}
                {index < processSteps?.length - 1 && (
                  <div className="flex justify-center py-4 relative">
                    <div className="w-px h-12 bg-gradient-to-b from-primary via-primary/50 to-transparent relative">
                      <motion.div 
                        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
                        animate={{ 
                          y: [0, 40, 0],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline Summary with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--art-teal))]/10 via-primary/5 to-[hsl(var(--art-coral))]/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm p-10 lg:p-12 rounded-3xl border border-primary/10 shadow-art">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                {language === 'es' ? 'Cronograma Típico del Proyecto' : 'Typical Project Timeline'}
              </h3>
              
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[hsl(var(--art-teal))]/20 to-[hsl(var(--art-coral))]/20 rounded-full mb-4 border border-primary/20">
                <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] bg-clip-text text-transparent">
                  {language === 'es' ? '3-6 semanas' : '3-6 weeks'}
                </span>
              </div>
              
              <p className="text-lg text-muted-foreground mb-2">
                {language === 'es' 
                  ? 'Desde la consulta inicial hasta la finalización'
                  : 'From initial consultation to completion'
                }
              </p>
              <p className="text-sm text-muted-foreground/70 italic">
                {language === 'es' 
                  ? '*El tiempo puede variar según el tamaño y complejidad del proyecto'
                  : '*Timing may vary based on project size and complexity'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
