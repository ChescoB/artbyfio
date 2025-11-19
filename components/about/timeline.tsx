
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/lib/language-context';
import { Award, MapPin, Palette, Users } from 'lucide-react';

const timelineEvents = [
  {
    year: '1998',
    icon: Palette,
    titleEn: 'Artistic Journey Begins',
    titleEs: 'Comienza el Viaje Artístico',
    descEn: 'Started creating murals in Chile, developing her signature style blending nature and cultural themes.',
    descEs: 'Comenzó a crear murales en Chile, desarrollando su estilo característico que mezcla la naturaleza y temas culturales.',
    location: 'Chile'
  },
  {
    year: '2005',
    icon: MapPin,
    titleEn: 'International Expansion',
    titleEs: 'Expansión Internacional',
    descEn: 'First international projects in Spain and Argentina, establishing her reputation across borders.',
    descEs: 'Primeros proyectos internacionales en España y Argentina, estableciendo su reputación más allá de las fronteras.',
    location: 'Spain & Argentina'
  },
  {
    year: '2012',
    icon: Users,
    titleEn: 'Community Engagement',
    titleEs: 'Compromiso Comunitario',
    descEn: 'Began teaching mural arts to children and communities, sharing her passion for transformative art.',
    descEs: 'Comenzó a enseñar artes murales a niños y comunidades, compartiendo su pasión por el arte transformativo.',
    location: 'Various Locations'
  },
  {
    year: '2016',
    icon: Award,
    titleEn: 'Art Basel Recognition',
    titleEs: 'Reconocimiento en Art Basel',
    descEn: 'Featured at Art Basel Miami, bringing her work to international collectors and art enthusiasts.',
    descEs: 'Presentada en Art Basel Miami, llevando su trabajo a coleccionistas internacionales y entusiastas del arte.',
    location: 'Miami, FL'
  },
  {
    year: '2018',
    icon: Award,
    titleEn: 'Award-Winning Project',
    titleEs: 'Proyecto Ganador de Premio',
    descEn: '"I Am My Dreams" mural in Spain receives critical acclaim and international recognition.',
    descEs: 'El mural "I Am My Dreams" en España recibe elogios de la crítica y reconocimiento internacional.',
    location: 'Spain'
  },
  {
    year: '2020',
    icon: Users,
    titleEn: 'Boys & Girls Clubs',
    titleEs: 'Boys & Girls Clubs',
    descEn: 'Became resident artist and instructor, creating transformative spaces for youth development.',
    descEs: 'Se convirtió en artista residente e instructora, creando espacios transformativos para el desarrollo juvenil.',
    location: 'Florida'
  },
  {
    year: '2023',
    icon: Palette,
    titleEn: 'Monumental Works',
    titleEs: 'Obras Monumentales',
    descEn: 'Completed "Magic Nature" (55×20ft) and "Future Landscape" (90×40ft) - her largest works to date.',
    descEs: 'Completó "Magic Nature" (55×20ft) y "Future Landscape" (90×40ft) - sus obras más grandes hasta la fecha.',
    location: 'Florida'
  }
];

export default function Timeline() {
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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-secondary/10" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {language === 'es' ? 'Cronología Artística' : 'Artistic Timeline'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {language === 'es' 
              ? 'Hitos clave en el viaje de más de 30 años de Fio'
              : 'Key milestones in Fio\'s 30+ year journey'
            }
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

          {timelineEvents?.map((event, index) => {
            const IconComponent = event?.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center shadow-art">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-card p-6 rounded-xl shadow-art border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-display font-bold text-primary">
                        {event?.year}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event?.location}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-2">
                      {language === 'es' ? event?.titleEs : event?.titleEn}
                    </h4>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'es' ? event?.descEs : event?.descEn}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
