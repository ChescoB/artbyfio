
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Info } from 'lucide-react';

// Updated pricing - fresh build
const pricingTiers = [
  {
    nameEn: 'Residential Murals',
    nameEs: 'Murales Residenciales',
    priceRange: 'Starting at $650+ USD',
    priceRangeEs: 'Desde $650+ USD',
    descEn: 'Perfect for homes, bedrooms, and personal spaces',
    descEs: 'Perfecto para hogares, dormitorios y espacios personales',
    featuresEn: [
      'Up to 200 sq ft coverage',
      'Custom design consultation',
      'Premium acrylic paints',
      '2-week completion',
      'Maintenance guide included'
    ],
    featuresEs: [
      'Hasta 200 pies cuadrados de cobertura',
      'Consulta de diseño personalizado',
      'Pinturas acrílicas premium',
      'Finalización en 2 semanas',
      'Guía de mantenimiento incluida'
    ],
    popular: false
  },
  {
    nameEn: 'Commercial Projects',
    nameEs: 'Proyectos Comerciales',
    priceRange: 'Starting at $5000+ USD',
    priceRangeEs: 'Desde $5000+ USD',
    descEn: 'Ideal for businesses, restaurants, and offices',
    descEs: 'Ideal para empresas, restaurantes y oficinas',
    featuresEn: [
      'Up to 800 sq ft coverage',
      'Brand integration options',
      'Weather-resistant materials',
      '3-4 week completion',
      'Professional photography'
    ],
    featuresEs: [
      'Hasta 800 pies cuadrados de cobertura',
      'Opciones de integración de marca',
      'Materiales resistentes al clima',
      'Finalización en 3-4 semanas',
      'Fotografía profesional'
    ],
    popular: true
  },
  {
    nameEn: 'Large Scale Installations',
    nameEs: 'Instalaciones de Gran Escala',
    priceRange: 'Starting at $10,000+ USD',
    priceRangeEs: 'Desde $10,000+ USD',
    descEn: 'Monumental works for public spaces and institutions',
    descEs: 'Obras monumentales para espacios públicos e instituciones',
    featuresEn: [
      '800+ sq ft coverage',
      'Multi-wall installations',
      'Community collaboration',
      '4-8 week completion',
      'Ongoing maintenance support'
    ],
    featuresEs: [
      'Más de 800 pies cuadrados de cobertura',
      'Instalaciones de múltiples paredes',
      'Colaboración comunitaria',
      'Finalización en 4-8 semanas',
      'Soporte de mantenimiento continuo'
    ],
    popular: false
  }
];

export default function PricingSection() {
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
            {language === 'es' ? 'Inversión en Arte' : 'Investment in Art'}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {language === 'es' 
              ? 'Precios transparentes para diferentes escalas de proyecto. Cada mural es una inversión en belleza duradera.'
              : 'Transparent pricing for different project scales. Each mural is an investment in lasting beauty.'
            }
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center text-sm text-muted-foreground"
          >
            <Info className="w-4 h-4 mr-2" />
            <span>
              {language === 'es' 
                ? 'Todos los precios incluyen materiales premium y garantía de 5 años'
                : 'All prices include premium materials and 5-year warranty'
              }
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {pricingTiers?.map((tier, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {tier?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] text-white px-4 py-1 rounded-full text-sm font-medium">
                    {language === 'es' ? 'Más Popular' : 'Most Popular'}
                  </span>
                </div>
              )}
              
              <Card className={`h-full ${tier?.popular ? 'ring-2 ring-primary shadow-art-lg' : 'shadow-art'} hover:shadow-art-lg transition-all duration-300 border-0`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    {language === 'es' ? tier?.nameEs : tier?.nameEn}
                  </CardTitle>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-display text-primary mb-2">
                      {tier?.priceRange}
                    </div>
                    <p className="text-muted-foreground">
                      {language === 'es' ? tier?.descEs : tier?.descEn}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {(language === 'es' ? tier?.featuresEs : tier?.featuresEn)?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    variant={tier?.popular ? "art" : "outline"} 
                    className="w-full group"
                  >
                    <Link href="/contact">
                      {language === 'es' ? 'Solicitar Cotización' : 'Request Quote'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-card p-6 rounded-xl border">
            <h4 className="text-xl font-semibold mb-4">
              {language === 'es' ? 'Factores de Precio' : 'Pricing Factors'}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                language === 'es' ? 'Tamaño y complejidad del diseño' : 'Size and design complexity',
                language === 'es' ? 'Ubicación y accesibilidad del sitio' : 'Location and site accessibility',
                language === 'es' ? 'Materiales y técnicas especializadas' : 'Materials and specialized techniques',
                language === 'es' ? 'Cronograma del proyecto' : 'Project timeline'
              ].map((factor, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card p-6 rounded-xl border">
            <h4 className="text-xl font-semibold mb-4">
              {language === 'es' ? 'Opciones de Pago' : 'Payment Options'}
            </h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  {language === 'es' ? 'Depósito:' : 'Deposit:'}
                </span>{' '}
                {language === 'es' ? '30% para comenzar el proyecto' : '30% to begin project'}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {language === 'es' ? 'Progreso:' : 'Progress:'}
                </span>{' '}
                {language === 'es' ? '40% al aprobar el diseño' : '40% upon design approval'}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {language === 'es' ? 'Final:' : 'Final:'}
                </span>{' '}
                {language === 'es' ? '30% al completar' : '30% upon completion'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
