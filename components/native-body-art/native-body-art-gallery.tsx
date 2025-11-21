
'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, ZoomIn } from 'lucide-react'

// All body art images (excluding hero image and non-image files)
const bodyArtImages = [
  '02_8910-Adrian Eye.JPG',
  '02_NBA_0216.jpg',
  '03_9198.JPG',
  '04_NBA_6315.jpg',
  '06_9313-Adrian with hands.JPG',
  '06_NBA_0919.jpg',
  '08_9539.JPG',
  '100_NBA_7241.JPG',
  '10_9657-Donato open arms.JPG',
  '11_NBA_0191.jpg',
  '13_NBA_0193.jpg',
  '150514_827062493158_18700859_43714209_6998405_n.jpg',
  '163152_827061614918_18700859_43714163_5525590_n.jpg',
  '18_NBA_0925.jpg',
  '19_NBA_0949.jpg',
  '23_NBA_0175.jpg',
  '28_NBA_0199.jpg',
  '31_NBA_0638.jpg',
  '39_NBA_0694.jpg',
  '43_NBA_0764.jpg',
  '49_NBA_0881.jpg',
  '52_NBA_0948.jpg',
  '54_NBA_6263.JPG',
  '57_NBA_6451.JPG',
  '61_NBA_6497.JPG',
  '62_NBA_6330.JPG',
  '66_NBA_6619.JPG',
  '67_NBA_6646.JPG',
  '68_NBA_6623.JPG',
  '69_NBA_6647.JPG',
  '73_NBA_6756.JPG',
  '74325_1682852068298_1147478898_1912884_6963691_n.jpg',
  '74_NBA_6685.JPG',
  '76612_1682855548385_1147478898_1912899_4505483_n.jpg',
  '79_NBA_6852.JPG',
  '84_NBA_6920.JPG',
  '86_NBA_6932.JPG',
  '90_NBA_7050.JPG',
  '91_NBA_7044.JPG',
  '95_NBA_7111.JPG',
  '96_NBA_7121.JPG',
  '98_NBA_7160.JPG',
  'IMG_0049.JPG',
  'IMG_9046.JPG',
  'IMG_9058.JPG',
  'IMG_9100.JPG',
  'IMG_9170.JPG',
  'IMG_9194.JPG',
  'IMG_9199.JPG',
  'IMG_9204.JPG',
  'IMG_9308.JPG',
  'IMG_9387.JPG',
  'Lieux_101119_FioShoot-302 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-303 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-305 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-308 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-310 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-312 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-313 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-324 [1024x768Q].jpg',
  'Lieux_101119_FioShoot-327 [1024x768Q].jpg',
  'NBATourPendon1_1.jpg',
  'NBArenato.JPG',
  'NBArenato1.JPG',
  'Slide02.JPG',
  'Slide03.JPG',
  'Slide04.JPG',
  'Slide12.JPG',
  'Slide16.JPG',
  'Slide24.JPG',
  'Slide25.JPG',
  'Slide26.JPG',
  'Slide28.JPG',
  'Slide29.JPG',
  'Slide32.JPG',
  '_MG_6271.jpg',
  '_MG_6338.jpg',
  '_MG_6454.jpg',
  '_MG_6769.jpg',
  '_MG_6850.jpg',
  // '_MG_6876.jpg' - Used as hero image
  '_MG_7006.jpg',
  '_MG_7167 copy 2.jpg',
  'adri1.jpg',
  'couple by fio.jpg',
  'donatoair1.jpg',
  'group namaste.jpg',
  'jesusCpintado-140.JPG',
  'jesusCpintado-154.JPG',
  'jesusCpintadolot4-178.JPG',
  'jesusCpintadoloto-175.JPG',
  'jesusCpintadoloto2-171.JPG',
  'naranjas3.jpg',
]

interface ImageItemProps {
  src: string
  index: number
  onClick: () => void
}

function ImageItem({ src, index, onClick }: ImageItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 60 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 60 }}
      transition={{
        duration: 0.7,
        delay: (index % 8) * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-2xl transition-shadow duration-500"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <Image
            src={`/images/native-body-art/${src}`}
            alt="Native Body Art by Fiorella Podestá"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
          />
        </motion.div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 border-2"
          animate={{ 
            borderColor: isHovered ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Zoom icon with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border-2 border-white/40">
          <ZoomIn className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Bottom info bar with slide-up animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isHovered ? 0 : 100,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 p-4 text-white z-20"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">View Full Size</p>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
          >
            →
          </motion.div>
        </div>
      </motion.div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/40 to-transparent"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
      />
    </motion.div>
  )
}

export default function NatureBodyArtGallery() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  const content = {
    en: {
      sectionTitle: 'The Collection',
      description:
        'Through vibrant blues, earthy greens, and organic patterns, each piece explores themes of ecological connection, transformation, and our relationship with the natural world. These powerful performances celebrate the beauty of the human body as part of the greater ecosystem.',
      imageCount: `${bodyArtImages.length} artworks`,
    },
    es: {
      sectionTitle: 'La Colección',
      description:
        'A través de azules vibrantes, verdes terrosos y patrones orgánicos, cada pieza explora temas de conexión ecológica, transformación y nuestra relación con el mundo natural. Estas poderosas performances celebran la belleza del cuerpo humano como parte del ecosistema mayor.',
      imageCount: `${bodyArtImages.length} obras de arte`,
    },
  }

  const text = content[language]

  return (
    <>
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary font-semibold text-sm uppercase tracking-wider mb-4"
            >
              {text.imageCount}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              {text.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {text.description}
            </motion.p>
          </motion.div>

          {/* Masonry Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {bodyArtImages.map((image, index) => (
              <ImageItem
                key={image}
                src={image}
                index={index}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black/98 border-none overflow-hidden">
          {/* Close button with animation */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Image counter */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <p className="text-white text-sm font-medium">
                {bodyArtImages.indexOf(selectedImage) + 1} / {bodyArtImages.length}
              </p>
            </motion.div>
          )}

          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center p-8 md:p-12"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/images/native-body-art/${selectedImage}`}
                  alt="Native Body Art by Fiorella Podestá - Full View"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="95vw"
                  quality={100}
                  priority
                />
              </div>

              {/* Navigation buttons */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = bodyArtImages.indexOf(selectedImage)
                  const prevIndex = currentIndex === 0 ? bodyArtImages.length - 1 : currentIndex - 1
                  setSelectedImage(bodyArtImages[prevIndex])
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <span className="text-white text-2xl">←</span>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = bodyArtImages.indexOf(selectedImage)
                  const nextIndex = currentIndex === bodyArtImages.length - 1 ? 0 : currentIndex + 1
                  setSelectedImage(bodyArtImages[nextIndex])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20"
              >
                <span className="text-white text-2xl">→</span>
              </motion.button>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
