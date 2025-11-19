
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from '@/components/animated-counter';
import { useLanguage } from '@/lib/language-context';
import { Award, MapPin, Users, Palette } from 'lucide-react';

const stats = [
  {
    icon: Palette,
    value: 30,
    suffix: '+',
    labelEn: 'Years Experience',
    labelEs: 'Años de Experiencia'
  },
  {
    icon: Award,
    value: 90,
    suffix: '+',
    labelEn: 'Projects Completed',
    labelEs: 'Proyectos Completados'
  },
  {
    icon: MapPin,
    value: 7,
    suffix: '',
    labelEn: 'Countries',
    labelEs: 'Países'
  },
  {
    icon: Users,
    value: 100,
    suffix: '+',
    labelEn: 'Happy Clients',
    labelEs: 'Clientes Satisfechos'
  }
];

export default function StatsSection() {
  const { t, language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats?.map((stat, index) => {
            const IconComponent = stat?.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center shadow-art">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <div className="text-4xl md:text-5xl font-bold font-display mb-2 text-primary">
                  <AnimatedCounter 
                    end={stat?.value} 
                    suffix={stat?.suffix}
                    className="block"
                  />
                </div>
                
                <p className="text-muted-foreground font-medium">
                  {language === 'es' ? stat?.labelEs : stat?.labelEn}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
