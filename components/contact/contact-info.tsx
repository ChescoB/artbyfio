
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { artistInfo } from '@/lib/artist-data';
import { Mail, MapPin, Clock, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';

export default function ContactInfo() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const socialLinks = [
    { 
      icon: Instagram, 
      href: artistInfo?.socialLinks?.instagram, 
      label: 'Instagram',
      handle: '@artbyfio'
    },
    { 
      icon: Facebook, 
      href: artistInfo?.socialLinks?.facebook, 
      label: 'Facebook',
      handle: 'Art by Fio'
    },
    { 
      icon: Twitter, 
      href: artistInfo?.socialLinks?.twitter, 
      label: 'Twitter',
      handle: '@artbyfio'
    },
    { 
      icon: Youtube, 
      href: artistInfo?.socialLinks?.youtube, 
      label: 'YouTube',
      handle: 'Art by Fio'
    }
  ];

  const contactDetails = [
    {
      icon: Mail,
      title: language === 'es' ? 'Contacto Principal' : 'Primary Contact',
      content: artistInfo?.email,
      action: `mailto:${artistInfo?.email}`,
      description: language === 'es' ? 'Para consultas generales y comisiones' : 'For general inquiries and commissions'
    },
    {
      icon: MapPin,
      title: language === 'es' ? 'Ubicación Base' : 'Base Location',
      content: artistInfo?.location,
      description: language === 'es' ? 'Proyectos disponibles mundialmente' : 'Projects available worldwide'
    },
    {
      icon: Clock,
      title: language === 'es' ? 'Tiempo de Respuesta' : 'Response Time',
      content: '24-48 hours',
      description: language === 'es' ? 'Horario de trabajo estándar' : 'Standard business hours'
    }
  ];

  const faq = [
    {
      questionEn: 'How long does a typical mural project take?',
      questionEs: '¿Cuánto tiempo toma un proyecto típico de mural?',
      answerEn: 'Most projects take 3-6 weeks from initial consultation to completion, depending on size and complexity.',
      answerEs: 'La mayoría de los proyectos toman de 3-6 semanas desde la consulta inicial hasta la finalización, dependiendo del tamaño y complejidad.'
    },
    {
      questionEn: 'Do you work on projects outside of Florida?',
      questionEs: '¿Trabajas en proyectos fuera de Florida?',
      answerEn: 'Yes! I work internationally and have completed projects across 7 countries. Travel costs may apply for distant locations.',
      answerEs: '¡Sí! Trabajo internacionalmente y he completado proyectos en 7 países. Los costos de viaje pueden aplicar para ubicaciones distantes.'
    },
    {
      questionEn: 'What\'s included in the initial consultation?',
      questionEs: '¿Qué incluye la consulta inicial?',
      answerEn: 'The consultation includes site assessment, design discussion, timeline planning, and a detailed project proposal.',
      answerEs: 'La consulta incluye evaluación del sitio, discusión de diseño, planificación de cronograma y una propuesta detallada del proyecto.'
    }
  ];

  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-display font-bold mb-8 text-center lg:text-left">
              {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
            </h2>

            <div className="space-y-6">
              {contactDetails?.map((detail, index) => {
                const IconComponent = detail?.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-secondary/20 rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {detail?.title}
                      </h4>
                      {detail?.action ? (
                        <a
                          href={detail?.action}
                          className="text-primary hover:underline font-medium block mb-1"
                        >
                          {detail?.content}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium mb-1">{detail?.content}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{detail?.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-6 text-center lg:text-left">
              {language === 'es' ? 'Síguenos en Redes Sociales' : 'Follow on Social Media'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks?.filter(social => social?.href)?.map((social, index) => {
                const IconComponent = social?.icon;
                return (
                  <motion.a
                    key={index}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-card rounded-xl border hover:shadow-art transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground">{social?.label}</h5>
                      <p className="text-sm text-muted-foreground">{social?.handle}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-6 text-center lg:text-left">
              {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </h3>
            <div className="space-y-4">
              {faq?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border"
                >
                  <h5 className="font-semibold text-foreground mb-2">
                    {language === 'es' ? item?.questionEs : item?.questionEn}
                  </h5>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'es' ? item?.answerEs : item?.answerEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center bg-gradient-to-br from-primary/5 to-secondary/10 p-8 rounded-2xl"
          >
            <h4 className="text-xl font-display font-bold mb-4">
              {language === 'es' ? '¿Listo para Comenzar?' : 'Ready to Get Started?'}
            </h4>
            <p className="text-muted-foreground mb-6">
              {language === 'es' 
                ? 'Cada mural extraordinario comienza con una simple conversación.'
                : 'Every extraordinary mural starts with a simple conversation.'
              }
            </p>
            <Link
              href={`mailto:${artistInfo?.email}`}
              className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              <Mail className="w-5 h-5 mr-2" />
              {artistInfo?.email}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
