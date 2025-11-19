
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { Quote } from 'lucide-react';

const philosophyPoints = [
  {
    titleEn: 'Art as Connection',
    titleEs: 'Arte como Conexión',
    contentEn: 'Every mural is a bridge between cultures, connecting diverse communities through shared visual experiences and universal themes.',
    contentEs: 'Cada mural es un puente entre culturas, conectando comunidades diversas a través de experiencias visuales compartidas y temas universales.'
  },
  {
    titleEn: 'Transformation Through Color',
    titleEs: 'Transformación a Través del Color',
    contentEn: 'Bold colors have the power to transform not just spaces, but the emotions and energy of everyone who experiences them.',
    contentEs: 'Los colores audaces tienen el poder de transformar no solo los espacios, sino las emociones y la energía de todos los que los experimentan.'
  },
  {
    titleEn: 'Storytelling on Walls',
    titleEs: 'Narrativa en las Paredes',
    contentEn: 'Each wall tells a story - my role is to listen to that story and give it visual form that resonates with the community.',
    contentEs: 'Cada pared cuenta una historia - mi papel es escuchar esa historia y darle una forma visual que resuene con la comunidad.'
  }
];

export default function Philosophy() {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Philosophy Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              {language === 'es' ? 'Filosofía Creativa' : 'Creative Philosophy'}
            </h2>

            {/* Main Quote */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-8 rounded-2xl mb-8 relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20" />
              <blockquote className="text-lg italic leading-relaxed text-muted-foreground mb-4">
                {language === 'es' 
                  ? '"Creo que el arte mural tiene el poder único de transformar no solo espacios físicos, sino también las almas de las comunidades. Cuando pinto, no estoy simplemente aplicando color a una pared - estoy tejiendo historias, conectando culturas y creando espacios donde las personas pueden soñar."'
                  : '"I believe mural art has the unique power to transform not just physical spaces, but the souls of communities. When I paint, I\'m not simply applying color to a wall - I\'m weaving stories, connecting cultures, and creating spaces where people can dream."'
                }
              </blockquote>
              <cite className="text-primary font-semibold">— Fiorella Podestá</cite>
            </div>

            {/* Philosophy Points */}
            <div className="space-y-6">
              {philosophyPoints?.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'es' ? point?.titleEs : point?.titleEn}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === 'es' ? point?.contentEs : point?.contentEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-art-lg">
              <Image
                src="/images/body-art/23_NBA_0175.jpg"
                alt="Artist's hands covered in colorful paint holding brushes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-art-lg"
            >
              <Palette className="w-8 h-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-[hsl(var(--art-coral))] to-[hsl(var(--art-gold))] text-white p-4 rounded-xl shadow-art-lg"
            >
              <p className="text-sm font-medium whitespace-nowrap">
                {language === 'es' ? 'Arte con Alma' : 'Art with Soul'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.15-.59-1.56-.36-.41-.59-.94-.59-1.56 0-1.38 1.12-2.5 2.5-2.5H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10zM7.5 9C8.33 9 9 8.33 9 7.5S8.33 6 7.5 6 6 6.67 6 7.5 6.67 9 7.5 9zm3-4C11.33 5 12 4.33 12 3.5S11.33 2 10.5 2 9 2.67 9 3.5 9.67 5 10.5 5zm3 0C14.33 5 15 4.33 15 3.5S14.33 2 13.5 2 12 2.67 12 3.5 12.67 5 13.5 5zm3.5 2.5C17.33 9 18 8.33 18 7.5S17.33 6 16.5 6 15 6.67 15 7.5 15.67 9 16.5 9z"/>
  </svg>
);
