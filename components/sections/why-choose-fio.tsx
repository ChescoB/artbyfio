
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Palette, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const features = [
  {
    icon: Globe,
    titleKey: 'why.international',
    titleDefault: 'International Portfolio',
    descEn: 'Art installations across 7 countries with prestigious clients worldwide',
    descEs: 'Instalaciones de arte en 7 países con clientes prestigiosos mundialmente'
  },
  {
    icon: Palette,
    titleKey: 'why.scale',
    titleDefault: 'Large-Scale Installations',
    descEn: 'Specializing in transformative murals from 20ft to 100ft+ wall spaces',
    descEs: 'Especializada en murales transformadores de 20ft a 100ft+ de espacios'
  },
  {
    icon: Zap,
    titleKey: 'why.aesthetic',
    titleDefault: 'Unique Aesthetic',
    descEn: 'Signature style blending bold colors, nature, and cultural storytelling',
    descEs: 'Estilo único que combina colores audaces, naturaleza y narrativa cultural'
  },
  {
    icon: Users,
    titleKey: 'why.process',
    titleDefault: 'Streamlined Process',
    descEn: 'From initial consultation to final installation - seamless collaboration',
    descEs: 'Desde la consulta inicial hasta la instalación final - colaboración fluida'
  }
];

export default function WhyChooseFio() {
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
    <section className="py-20 bg-secondary/20" ref={ref}>
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
            {t('why.title', 'Why Choose Art By Fio?')}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {language === 'es' 
              ? 'Más de 30+ años creando experiencias artísticas que transforman espacios y conectan comunidades'
              : 'Over 30+ years creating artistic experiences that transform spaces and connect communities'
            }
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features?.map((feature, index) => {
            const IconComponent = feature?.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-art">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 font-display">
                  {t(feature?.titleKey, feature?.titleDefault)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'es' ? feature?.descEs : feature?.descEn}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
