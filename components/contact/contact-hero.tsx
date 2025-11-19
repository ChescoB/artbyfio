
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Calendar, MessageCircle, Phone } from 'lucide-react';

export default function ContactHero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full aspect-[16/9]">
          <Image
            src="/images/Murals/featured_02_cdn_shop_files.jpg"
            alt="Artist's hands with colorful paint and brushes"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            {t('contact.title', 'Contact')}
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-8">
            {t('contact.subtitle', 'Ready to transform your space?')}
          </p>
          
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-12">
            {language === 'es' 
              ? 'Cada gran mural comienza con una conversación. Hablemos sobre tu visión, espacio y cómo podemos crear algo extraordinario juntos.'
              : 'Every great mural starts with a conversation. Let\'s talk about your vision, space, and how we can create something extraordinary together.'
            }
          </p>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                icon: MessageCircle,
                title: language === 'es' ? 'Enviar Mensaje' : 'Send Message',
                desc: language === 'es' ? 'Formulario de contacto completo' : 'Complete contact form'
              },
              {
                icon: Calendar,
                title: language === 'es' ? 'Programar Consulta' : 'Schedule Consultation',
                desc: language === 'es' ? 'Consulta gratuita de 30 min' : 'Free 30-min consultation'
              },
              {
                icon: Phone,
                title: language === 'es' ? 'Respuesta Rápida' : 'Quick Response',
                desc: language === 'es' ? '24-48 horas típicamente' : '24-48 hours typically'
              }
            ].map((method, index) => {
              const IconComponent = method?.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">{method?.title}</h4>
                  <p className="text-white/70 text-sm">{method?.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
