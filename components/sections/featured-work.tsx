
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/language-context';
import { ArrowRight, MapPin, Calendar, Eye } from 'lucide-react';
import ProjectDetailDialog from '@/components/portfolio/project-detail-dialog';

// Featured artwork data based on research
const featuredProjects = [
  {
    id: 1,
    title: 'Soy Lo Que Digo',
    titleEs: 'Soy Lo Que Digo',
    location: 'Spain',
    year: 2023,
    dimensions: '40 ft x 15 ft',
    category: 'Public Art',
    imageUrl: '/IMAGES/PORTAFOLIO/MURALS/hero_01_cdn_shop_files.jpg',
    description: 'Powerful statement piece celebrating self-expression and identity',
    descriptionEs: 'Pieza de declaración poderosa celebrando la autoexpresión y la identidad'
  },
  {
    id: 2,
    title: 'Collaboration in Spain',
    titleEs: 'Colaboración en España',
    location: 'Spain',
    year: 2022,
    dimensions: '50 ft x 20 ft',
    category: 'Public Art',
    imageUrl: '/IMAGES/PORTAFOLIO/MURALS/featured_02_cdn_shop_files.jpg',
    description: 'International collaboration featuring vibrant colors and cultural fusion',
    descriptionEs: 'Colaboración internacional con colores vibrantes y fusión cultural'
  },
  {
    id: 3,
    title: 'Bushwick Collective',
    titleEs: 'Colectivo Bushwick',
    location: 'Brooklyn, NYC',
    year: 2023,
    dimensions: '35 ft x 20 ft',
    category: 'Public Art',
    imageUrl: '/IMAGES/PORTAFOLIO/MURALS/portfolio_03_cdn_shop_files.jpg',
    description: 'Iconic street art in one of the world\'s most famous outdoor galleries',
    descriptionEs: 'Arte callejero icónico en una de las galerías al aire libre más famosas del mundo'
  },
  {
    id: 4,
    title: 'Meeting of Styles',
    titleEs: 'Meeting of Styles',
    location: 'Miami, FL',
    year: 2022,
    dimensions: '45 ft x 18 ft',
    category: 'Public Art',
    imageUrl: '/IMAGES/PORTAFOLIO/MURALS/portfolio_05_cdn_shop_files.jpg',
    description: 'Dynamic festival piece showcasing contemporary urban art',
    descriptionEs: 'Pieza dinámica del festival mostrando arte urbano contemporáneo'
  }
];

export default function FeaturedWork() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof featuredProjects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleViewDetails = (project: typeof featuredProjects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
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
    <>
      <section className="py-20" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            {language === 'es' ? 'Obras Destacadas' : 'Featured Work'}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {language === 'es' 
              ? 'Explora una selección de murales transformadores que han dado vida a espacios únicos'
              : 'Explore a selection of transformative murals that have brought unique spaces to life'
            }
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {featuredProjects?.map((project) => (
            <motion.div
              key={project?.id}
              variants={itemVariants}
              className="gallery-item"
            >
              <Card className="overflow-hidden h-full border-0 shadow-art hover:shadow-art-lg transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project?.imageUrl ?? ''}
                    alt={`${project?.title} - ${project?.location}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      {project?.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {language === 'es' ? (project?.titleEs ?? project?.title) : project?.title}
                  </h3>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project?.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project?.year}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {language === 'es' ? (project?.descriptionEs ?? project?.description) : project?.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">
                      {project?.dimensions}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn"
                      onClick={() => handleViewDetails(project)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {language === 'es' ? 'Ver Detalles' : 'View Details'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to Portfolio */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <Button asChild variant="art" size="lg">
            <Link href="/portfolio">
              {t('common.view_all', 'View All')} {t('nav.portfolio', 'Portfolio')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Project Detail Dialog */}
    <ProjectDetailDialog
      isOpen={isDialogOpen}
      onClose={handleCloseDialog}
      project={selectedProject}
    />
    </>
  );
}
