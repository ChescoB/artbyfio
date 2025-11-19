
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Expanded testimonials collection
const testimonials = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    company: 'Montessori Academy',
    location: 'Tamarac, FL',
    contentEn: 'Fio transformed our school into a magical learning environment. The children are mesmerized by the nature mural and it has become an integral part of their daily inspiration.',
    contentEs: 'Fio transformó nuestra escuela en un ambiente mágico de aprendizaje. Los niños están fascinados por el mural de naturaleza y se ha convertido en parte integral de su inspiración diaria.',
    rating: 5,
    projectYear: 2023
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    company: 'Boys & Girls Club',
    location: 'Delray Beach, FL',
    contentEn: 'Working with Fiorella was an incredible experience. Her "Future Landscape" mural has brought new energy to our facility and the kids absolutely love it. Professional and visionary.',
    contentEs: 'Trabajar con Fiorella fue una experiencia increíble. Su mural "Future Landscape" ha traído nueva energía a nuestras instalaciones y a los niños les encanta. Profesional y visionaria.',
    rating: 5,
    projectYear: 2023
  },
  {
    id: 3,
    name: 'Isabella Santos',
    company: 'Ballet Academy Miami',
    location: 'Miami, FL',
    contentEn: 'The Ndebele art mural is absolutely stunning. Fio captured the cultural essence perfectly while creating something that inspires our students every day. Truly exceptional work.',
    contentEs: 'El mural de arte Ndebele es absolutamente impresionante. Fio capturó la esencia cultural perfectamente mientras creaba algo que inspira a nuestros estudiantes todos los días. Trabajo verdaderamente excepcional.',
    rating: 5,
    projectYear: 2022
  },
  {
    id: 4,
    name: 'Robert Chen',
    company: 'Downtown Loft Residences',
    location: 'Miami, FL',
    contentEn: 'Fio\'s artwork completely transformed our building lobby. Her vibrant murals create an unforgettable first impression for residents and visitors. Worth every penny.',
    contentEs: 'La obra de Fio transformó completamente el vestíbulo de nuestro edificio. Sus murales vibrantes crean una primera impresión inolvidable para residentes y visitantes. Vale cada centavo.',
    rating: 5,
    projectYear: 2024
  },
  {
    id: 5,
    name: 'Sarah Mitchell',
    company: 'Ocean View Restaurant',
    location: 'Fort Lauderdale, FL',
    contentEn: 'Our customers can\'t stop talking about the stunning ocean-themed mural Fio created. It\'s become our signature feature and a major draw for new guests. Absolutely phenomenal.',
    contentEs: 'Nuestros clientes no paran de hablar sobre el impresionante mural con tema oceánico que Fio creó. Se ha convertido en nuestra característica distintiva y un gran atractivo para nuevos invitados. Absolutamente fenomenal.',
    rating: 5,
    projectYear: 2023
  },
  {
    id: 6,
    name: 'Carlos Mendoza',
    company: 'Tech Innovation Hub',
    location: 'Boca Raton, FL',
    contentEn: 'Fiorella brought our vision of a futuristic workspace to life. The mural inspires creativity and innovation among our team daily. Her professionalism and talent are unmatched.',
    contentEs: 'Fiorella dio vida a nuestra visión de un espacio de trabajo futurista. El mural inspira creatividad e innovación en nuestro equipo diariamente. Su profesionalismo y talento son incomparables.',
    rating: 5,
    projectYear: 2024
  },
  {
    id: 7,
    name: 'Jennifer Brooks',
    company: 'Sunrise Medical Center',
    location: 'Sunrise, FL',
    contentEn: 'The healing garden mural in our pediatric wing has made such a positive impact on our young patients. Fio\'s ability to create calming, beautiful spaces is truly a gift.',
    contentEs: 'El mural del jardín sanador en nuestra ala pediátrica ha tenido un impacto tan positivo en nuestros pacientes jóvenes. La habilidad de Fio para crear espacios hermosos y calmantes es verdaderamente un regalo.',
    rating: 5,
    projectYear: 2023
  },
  {
    id: 8,
    name: 'Michael Torres',
    company: 'Heritage Community Center',
    location: 'West Palm Beach, FL',
    contentEn: 'Fio captured our community\'s multicultural spirit perfectly. The mural celebrates our diversity and has become a beloved gathering spot. We couldn\'t be happier with the result.',
    contentEs: 'Fio capturó perfectamente el espíritu multicultural de nuestra comunidad. El mural celebra nuestra diversidad y se ha convertido en un lugar de reunión muy querido. No podríamos estar más felices con el resultado.',
    rating: 5,
    projectYear: 2022
  },
  {
    id: 9,
    name: 'Amanda Peterson',
    company: 'Wellness Spa & Retreat',
    location: 'Jupiter, FL',
    contentEn: 'The botanical mural Fio created for our meditation room is breathtaking. Guests say it enhances their relaxation experience. Her attention to detail is extraordinary.',
    contentEs: 'El mural botánico que Fio creó para nuestra sala de meditación es impresionante. Los huéspedes dicen que mejora su experiencia de relajación. Su atención al detalle es extraordinaria.',
    rating: 5,
    projectYear: 2024
  }
];

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Auto-cycle through testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(timer);
  }, [totalPages]);

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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
            {language === 'es' ? 'Lo Que Dicen los Clientes' : 'What Clients Say'}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {language === 'es' 
              ? 'Testimonios reales de clientes que han experimentado la transformación artística de Fio'
              : 'Real testimonials from clients who have experienced Fio\'s artistic transformation'
            }
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Testimonials grid with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {currentTestimonials?.map((testimonial, idx) => (
                <motion.div
                  key={testimonial?.id}
                  variants={itemVariants}
                  custom={idx}
                >
                  <Card className="h-full shadow-art hover:shadow-art-lg transition-all duration-300 border-0 relative overflow-hidden">
                    {/* Quote decoration */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[hsl(var(--art-teal))]/10 to-[hsl(var(--art-coral))]/10 rounded-full flex items-center justify-center">
                      <Quote className="w-8 h-8 text-primary/30" />
                    </div>

                    <CardContent className="p-6 relative">
                      {/* Rating */}
                      <div className="flex mb-4">
                        {Array.from({ length: testimonial?.rating ?? 5 }, (_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Testimonial content */}
                      <p className="text-muted-foreground leading-relaxed mb-6 italic">
                        "{language === 'es' ? (testimonial?.contentEs ?? testimonial?.contentEn) : testimonial?.contentEn}"
                      </p>

                      {/* Client info */}
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-1">
                          {testimonial?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial?.company}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial?.location} • {testimonial?.projectYear}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Page indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
