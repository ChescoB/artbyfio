
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Palette, Building, Home, Users } from 'lucide-react';

const serviceTypes = [
  {
    icon: Building,
    labelEn: 'Commercial',
    labelEs: 'Comercial',
    countEn: '40+ Projects',
    countEs: '40+ Proyectos'
  },
  {
    icon: Home,
    labelEn: 'Residential',
    labelEs: 'Residencial',
    countEn: '25+ Homes',
    countEs: '25+ Hogares'
  },
  {
    icon: Users,
    labelEn: 'Public Art',
    labelEs: 'Arte Público',
    countEn: '25+ Installations',
    countEs: '25+ Instalaciones'
  }
];

export default function ServicesHero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full aspect-[16/9]">
          <Image
            src="https://images.pexels.com/photos/1108532/pexels-photo-1108532.jpeg"
            alt="Professional paint brushes and colorful palette"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              {t('services.title', 'Services')}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 mb-8">
              {t('services.subtitle', 'Bringing your artistic vision to life')}
            </p>
            
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              {language === 'es' 
                ? 'Desde consultoría artística hasta instalaciones monumentales, ofrezco servicios completos de arte mural que transforman espacios ordinarios en experiencias extraordinarias.'
                : 'From artistic consultation to monumental installations, I offer comprehensive mural art services that transform ordinary spaces into extraordinary experiences.'
              }
            </p>

            {/* Service Type Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              {serviceTypes?.map((type, index) => {
                const IconComponent = type?.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {language === 'es' ? type?.countEs : type?.countEn}
                    </div>
                    <div className="text-white/70 text-xs">
                      {language === 'es' ? type?.labelEs : type?.labelEn}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Floating Service Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: language === 'es' ? 'Murales Personalizados' : 'Custom Murals',
                  desc: language === 'es' ? 'Diseños únicos para tu espacio' : 'Unique designs for your space'
                },
                {
                  title: language === 'es' ? 'Consultoría Artística' : 'Art Consultation',
                  desc: language === 'es' ? 'Orientación experta en diseño' : 'Expert guidance on design'
                },
                {
                  title: language === 'es' ? 'Instalación Completa' : 'Full Installation',
                  desc: language === 'es' ? 'De concepto a finalización' : 'From concept to completion'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl"
                >
                  <h4 className="text-white font-semibold mb-1">{service?.title}</h4>
                  <p className="text-white/70 text-sm">{service?.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
