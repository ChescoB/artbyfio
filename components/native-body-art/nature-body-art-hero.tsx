
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { useLanguage } from '@/lib/language-context'
import { ArrowDown } from 'lucide-react'

export default function NativeBodyArtHero() {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const content = {
    en: {
      title: 'Native Body Art',
      subtitle: 'Where Human Form Meets Natural Canvas',
      description:
        'An immersive environmental art project exploring the profound connection between the human body and nature through vibrant, earth-inspired body painting.',
    },
    es: {
      title: 'Arte Corporal Nativo',
      subtitle: 'Donde la Forma Humana se Encuentra con el Lienzo Natural',
      description:
        'Un proyecto de arte ambiental inmersivo que explora la conexión profunda entre el cuerpo humano y la naturaleza a través de vibrante pintura corporal inspirada en la tierra.',
    },
  }

  const text = content[language]

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background Image with Scale Effect */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <motion.div style={{ scale }} className="relative w-full h-[120vh]">
          <Image
            src="/images/native-body-art/_MG_6876.jpg"
            alt="Native Body Art"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
          
          {/* Animated overlay pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-primary font-semibold text-sm md:text-base uppercase tracking-wider mb-4"
          >
            Featured Project
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white relative"
          >
            <span className="relative inline-block">
              {text.title}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeInOut' }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-8"
          >
            {text.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {text.description}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
