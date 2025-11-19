
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';
import { MapPin, Star, Heart, Palette } from 'lucide-react';

const storyHighlights = [
  {
    icon: MapPin,
    titleEn: 'Chilean Roots',
    titleEs: 'Raíces Chilenas',
    contentEn: 'Born in Chile\'s mystical Elqui Valley, surrounded by dramatic landscapes that would later influence her use of bold colors and natural motifs.',
    contentEs: 'Nacida en el místico Valle del Elqui de Chile, rodeada de paisajes dramáticos que luego influirían en su uso de colores audaces y motivos naturales.'
  },
  {
    icon: Star,
    titleEn: 'International Recognition',
    titleEs: 'Reconocimiento Internacional',
    contentEn: 'Her work has been featured in prestigious venues including Art Basel Miami, establishing her as a sought-after international artist.',
    contentEs: 'Su trabajo ha sido presentado en lugares prestigiosos incluyendo Art Basel Miami, estableciéndola como una artista internacional codiciada.'
  },
  {
    icon: Heart,
    titleEn: 'Community Impact',
    titleEs: 'Impacto Comunitario',
    contentEn: 'Beyond creating beautiful art, Fio teaches mural painting at Boys & Girls Clubs, inspiring the next generation of artists.',
    contentEs: 'Más allá de crear arte hermoso, Fio enseña pintura mural en Boys & Girls Clubs, inspirando a la próxima generación de artistas.'
  },
  {
    icon: Palette,
    titleEn: 'Artistic Evolution',
    titleEs: 'Evolución Artística',
    contentEn: 'Her style continuously evolves, blending traditional techniques with contemporary themes, creating murals that speak to diverse audiences.',
    contentEs: 'Su estilo evoluciona continuamente, mezclando técnicas tradicionales con temas contemporáneos, creando murales que hablan a audiencias diversas.'
  }
];

export default function ArtistStory() {
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
    <section className="py-20" ref={ref}>
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
            {language === 'es' ? 'La Historia de Fio' : 'Fio\'s Story'}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {language === 'es' 
              ? 'Un viaje artístico que abarca continentes, culturas y más de dos décadas de transformar espacios a través del arte mural'
              : 'An artistic journey spanning continents, cultures, and over two decades of transforming spaces through mural art'
            }
          </motion.p>
        </motion.div>

        {/* Main Story Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-art-lg">
              <Image
                src="/images/artist/fio-lift-female-mural.jpg"
                alt="Fiorella Podestá working on a large-scale mural from a lift"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              {language === 'es' 
                ? 'El viaje artístico de Fiorella comenzó en el Valle del Elqui, donde los dramáticos paisajes montañosos y los cielos estrellados infinitos despertaron su pasión por el arte. Esta conexión temprana con la naturaleza se convirtió en una piedra angular de su trabajo, evidente en las paletas vibrantes y los motivos orgánicos que caracterizan sus murales.'
                : 'Fiorella\'s artistic journey began in the Elqui Valley, where dramatic mountain landscapes and endless starlit skies awakened her passion for art. This early connection with nature became a cornerstone of her work, evident in the vibrant palettes and organic motifs that characterize her murals.'
              }
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {language === 'es' 
                ? 'Durante más de dos décadas, Fio ha perfeccionado su arte a través de viajes internacionales, absorbiendo influencias culturales desde las calles de Barcelona hasta los centros comunitarios de Miami. Cada proyecto se convierte en una colaboración entre su visión artística y las historias únicas de los espacios que transforma.'
                : 'Over two decades, Fio has refined her craft through international travels, absorbing cultural influences from Barcelona\'s streets to Miami\'s community centers. Each project becomes a collaboration between her artistic vision and the unique stories of the spaces she transforms.'
              }
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              {language === 'es' 
                ? 'Lo que distingue a Fio no es solo su dominio técnico, sino su capacidad para crear murales que resuenan emocionalmente con las comunidades. Sus obras no son solo decoración; son catalizadores para la conexión, la inspiración y la transformación cultural.'
                : 'What sets Fio apart is not just her technical mastery, but her ability to create murals that resonate emotionally with communities. Her works are not mere decoration; they are catalysts for connection, inspiration, and cultural transformation.'
              }
            </p>
          </motion.div>
        </div>

        {/* Story Highlights Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {storyHighlights?.map((highlight, index) => {
            const IconComponent = highlight?.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 bg-secondary/20 rounded-xl border hover:shadow-art transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-[hsl(var(--art-teal))] to-[hsl(var(--art-coral))] flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-display font-semibold mb-3">
                  {language === 'es' ? highlight?.titleEs : highlight?.titleEn}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {language === 'es' ? highlight?.contentEs : highlight?.contentEn}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Fio at Work Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display font-bold mb-12 text-center"
          >
            {language === 'es' ? 'Fio en Acción' : 'Fio at Work'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: '/images/artist/fio-spray-painting-tropical.jpg',
                alt: 'Fio spray painting a vibrant tropical mural with pink and teal colors'
              },
              {
                src: '/images/artist/fio-butterfly-mural-hat.jpg',
                alt: 'Fio working from a lift on a large butterfly mural'
              },
              {
                src: '/images/artist/fio-ethereal-face-mural.jpg',
                alt: 'Fio creating an ethereal face mural with flowing lines'
              },
              {
                src: '/images/artist/fio-ladder-sketch-archway.jpg',
                alt: 'Fio sketching on a ladder in an architectural archway'
              },
              {
                src: '/images/artist_02_cdn_shop_files.jpg',
                alt: 'Fio working on detailed mural artwork'
              },
              {
                src: '/images/artist/fio-street-art-social.jpg',
                alt: 'Fio creating street art and engaging with the community'
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative aspect-square rounded-xl overflow-hidden shadow-art-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
