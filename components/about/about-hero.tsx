
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import AnimatedCounter from '@/components/animated-counter';
import { MapPin, Award, Palette, Users } from 'lucide-react';

const achievements = [
  { icon: Palette, value: 30, suffix: '+', labelEn: 'Years Creating', labelEs: 'Años Creando' },
  { icon: Award, value: 90, suffix: '+', labelEn: 'Murals Completed', labelEs: 'Murales Completados' },
  { icon: MapPin, value: 7, suffix: '', labelEn: 'Countries', labelEs: 'Países' },
  { icon: Users, value: 100, suffix: '+', labelEn: 'Happy Clients', labelEs: 'Clientes Felices' }
];

export default function AboutHero() {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              {t('about.title', 'About Fio')}
            </h1>
            
            <p className="text-2xl md:text-3xl font-display text-primary mb-6">
              {t('about.subtitle', 'Artist, Visionary, Storyteller')}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {language === 'es'
                ? 'Nacida en el místico Valle del Elqui en Chile, Fiorella Podestá ha dedicado más de 30 años a transformar espacios ordinarios en experiencias artísticas extraordinarias. Su viaje la ha llevado desde las montañas andinas hasta las vibrantes calles de Miami, creando murales que conectan culturas y comunidades.'
                : 'Born in Chile\'s mystical Elqui Valley, Fiorella Podestá has dedicated over 30 years to transforming ordinary spaces into extraordinary artistic experiences. Her journey has taken her from the Andean mountains to the vibrant streets of Miami, creating murals that connect cultures and communities.'}
            </p>

            {/* Achievement Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {achievements?.map((achievement, index) => {
                const IconComponent = achievement?.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold font-display text-primary">
                      <AnimatedCounter 
                        end={achievement?.value} 
                        suffix={achievement?.suffix}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'es' ? achievement?.labelEs : achievement?.labelEn}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-art-lg">
              <Image
                src="/images/artist/nahis-music-mural-spain.jpg"
                alt="Fiorella Podestá (Fio) posing in front of her vibrant music-themed mural in Spain, featuring a woman with flowing green hair and musical notes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-card p-6 rounded-xl shadow-art-lg border max-w-xs"
            >
              <p className="text-sm italic text-muted-foreground mb-2">
                {language === 'es' 
                  ? '"El arte mural es mi manera de conectar historias, culturas y sueños en cada pared que toco."'
                  : '"Mural art is my way of connecting stories, cultures, and dreams on every wall I touch."'
                }
              </p>
              <p className="text-sm font-semibold text-primary">— Fiorella Podestá</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
