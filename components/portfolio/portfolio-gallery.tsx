
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/language-context';
import { Eye, ArrowRight, Palette, Sparkles, Flower2, Brain, Mountain, ZoomIn, Paintbrush, Droplet, Droplets } from 'lucide-react';
import { MuralProjectWithTranslation } from '@/lib/types';
import { portfolioArtworks, categoryLabels } from '@/lib/portfolio-data';
import ProjectDetailDialog from './project-detail-dialog';

type FilterCategory = 'all' | 'canvas' | 'murals' | 'buddha' | 'freemind' | 'landscapes' | 'details' | 'oil' | 'acrylic' | 'commissioned';

export default function PortfolioGallery() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<MuralProjectWithTranslation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true
  });

  // Filter artworks based on selected category/series
  const filteredArtworks = useMemo(() => {
    let filtered: MuralProjectWithTranslation[];
    
    if (activeFilter === 'all') {
      filtered = [...portfolioArtworks];
    } else if (activeFilter === 'acrylic') {
      // Acrylic filter matches by medium, not category
      filtered = portfolioArtworks.filter(art => 
        art.medium?.toLowerCase().includes('acrylic')
      );
    } else if (activeFilter === 'oil') {
      // Oil filter matches by medium, not category
      filtered = portfolioArtworks.filter(art => 
        art.medium?.toLowerCase().includes('oil')
      );
    } else {
      // Other filters match by category
      filtered = portfolioArtworks.filter(art => art.category === activeFilter);
    }
    
    // Shuffle for 'all' and 'canvas' categories
    if (activeFilter === 'all' || activeFilter === 'canvas') {
      const shuffled = [...filtered];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return filtered;
  }, [activeFilter]);

  const handleViewDetails = (project: MuralProjectWithTranslation) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Lightweight container fade to avoid reflow-heavy animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Simplified card animation - no transform/scale to prevent layout shifts
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const filterVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05 }
  };

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          
          {/* Modern Grouped Filter Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="space-y-6">
              {/* Main Categories Row */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {(['all', 'canvas', 'murals'] as FilterCategory[]).map((category) => {
                  const IconComponent = 
                    category === 'all' ? Sparkles :
                    category === 'canvas' ? Palette :
                    Paintbrush;
                  
                  const isActive = activeFilter === category;
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`
                        relative px-6 md:px-8 py-3.5 md:py-4 rounded-xl
                        transition-all duration-300 group touch-manipulation
                        ${isActive 
                          ? 'bg-gradient-to-br from-primary/20 via-secondary/20 to-[hsl(var(--art-teal))]/20 shadow-xl border-2 border-primary/30' 
                          : 'bg-card hover:bg-accent/50 border-2 border-transparent'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activePrimary"
                          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-[hsl(var(--art-teal))]/10 rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <span className={`
                        flex items-center gap-2 text-base md:text-lg font-semibold transition-all duration-300 relative z-10
                        ${isActive ? 'text-primary' : 'text-foreground/80 group-hover:text-foreground'}
                      `}>
                        <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'scale-110' : ''}`} />
                        {language === 'es' ? categoryLabels[category].es : categoryLabels[category].en}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Decorative Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/40"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-4 text-muted-foreground">
                    {language === 'es' ? 'Series & Estilos' : 'Series & Styles'}
                  </span>
                </div>
              </div>

              {/* Series & Techniques Row */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {(['buddha', 'freemind', 'landscapes', 'details', 'oil', 'acrylic', 'commissioned'] as FilterCategory[]).map((category) => {
                  const IconComponent = 
                    category === 'buddha' ? Flower2 :
                    category === 'freemind' ? Brain :
                    category === 'landscapes' ? Mountain :
                    category === 'details' ? ZoomIn :
                    category === 'oil' ? Droplet :
                    category === 'acrylic' ? Droplets :
                    Palette;
                  
                  const isActive = activeFilter === category;
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`
                        relative px-4 md:px-5 py-2.5 md:py-3 rounded-lg
                        transition-all duration-300 group touch-manipulation
                        ${isActive 
                          ? 'bg-gradient-to-br from-primary/10 via-secondary/10 to-[hsl(var(--art-teal))]/10 shadow-lg border border-primary/30' 
                          : 'bg-card/50 hover:bg-accent/50 border border-transparent'
                        }
                      `}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSecondary"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-[hsl(var(--art-teal))]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      
                      <span className={`
                        flex items-center gap-1.5 text-sm md:text-base font-medium transition-all duration-300
                        ${isActive ? 'text-primary font-semibold' : 'text-foreground/70 group-hover:text-foreground'}
                      `}>
                        <IconComponent className={`w-4 h-4 ${isActive ? 'scale-110' : ''}`} />
                        <span className="hidden sm:inline">
                          {language === 'es' ? categoryLabels[category].es : categoryLabels[category].en}
                        </span>
                        <span className="sm:hidden">
                          {(language === 'es' ? categoryLabels[category].es : categoryLabels[category].en).split(' ')[0]}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Artwork Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-muted-foreground">
              {language === 'es' 
                ? `Mostrando ${filteredArtworks.length} ${filteredArtworks.length === 1 ? 'obra' : 'obras'}`
                : `Showing ${filteredArtworks.length} ${filteredArtworks.length === 1 ? 'artwork' : 'artworks'}`
              }
            </p>
          </motion.div>

          {/* Masonry Gallery Grid */}
          <motion.div 
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          >
              {filteredArtworks.map((artwork, index) => (
                <motion.div
                  key={`${activeFilter}-${artwork.id}`}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredId(artwork.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleViewDetails(artwork)}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 bg-card">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={(() => {
                          const url = artwork.imageUrl ?? '';
                          const parts = url.split('/');
                          const filename = parts.pop();
                          return `${parts.join('/')}/${encodeURIComponent(filename!)}`;
                        })()}
                        alt={language === 'es' ? (artwork.titleEs ?? artwork.title) : artwork.title}
                        className={`
                          w-full h-full object-cover transition-all duration-500
                          ${hoveredId === artwork.id ? 'scale-105 brightness-75' : 'scale-100'}
                        `}
                        loading={index < 6 ? 'eager' : 'lazy'}
                      />
                      
                      {/* Gradient Overlay */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: hoveredId === artwork.id ? 1 : 0
                        }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      />

                      {/* Featured Badge */}
                      {artwork.featured && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className="bg-gradient-to-r from-[hsl(var(--art-gold))] to-[hsl(var(--art-coral))] text-white border-0 shadow-lg">
                            ★ Featured
                          </Badge>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-background/80 capitalize">
                          {language === 'es' 
                            ? categoryLabels[artwork.category as FilterCategory]?.es || artwork.category
                            : categoryLabels[artwork.category as FilterCategory]?.en || artwork.category
                          }
                        </Badge>
                      </div>

                      {/* Hover Content */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: hoveredId === artwork.id ? 1 : 0,
                          y: hoveredId === artwork.id ? 0 : 20
                        }}
                        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="absolute inset-x-0 bottom-0 p-4 sm:p-6 z-10"
                      >
                        <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2">
                          {language === 'es' ? (artwork.titleEs ?? artwork.title) : artwork.title}
                        </h3>
                        <p className="text-white/90 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                          {language === 'es' 
                            ? (artwork.descriptionEs ?? artwork.description) 
                            : artwork.description
                          }
                        </p>
                        <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                          <span className="font-medium">{artwork.medium}</span>
                          {artwork.year && (
                            <>
                              <span>•</span>
                              <span>{artwork.year}</span>
                            </>
                          )}
                        </div>
                        
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="mt-4 w-full sm:w-auto group/btn"
                        >
                          <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                          {language === 'es' ? 'Ver Detalles' : 'View Details'}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Mobile Info (always visible on mobile) */}
                    <div className="p-5 md:p-6 lg:hidden">
                      <h3 className="text-lg font-display font-bold mb-2">
                        {language === 'es' ? (artwork.titleEs ?? artwork.title) : artwork.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed">
                        {language === 'es' 
                          ? (artwork.descriptionEs ?? artwork.description) 
                          : artwork.description
                        }
                      </p>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <span className="font-medium">{artwork.medium}</span>
                        {artwork.year && (
                          <>
                            <span>•</span>
                            <span>{artwork.year}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Empty State */}
          {filteredArtworks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Palette className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">
                {language === 'es' 
                  ? 'No se encontraron obras en esta categoría'
                  : 'No artworks found in this category'
                }
              </p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16 sm:mt-20 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-[hsl(var(--art-teal))]/5 rounded-2xl border border-primary/10"
          >
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-[hsl(var(--art-teal))] bg-clip-text text-transparent">
              {language === 'es' 
                ? 'Transforme su espacio con arte'
                : 'Transform Your Space with Art'
              }
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {language === 'es' 
                ? 'Cada obra cuenta una historia única. Exploremos cómo podemos crear algo extraordinario juntos.'
                : 'Every artwork tells a unique story. Let\'s explore how we can create something extraordinary together.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button asChild variant="art" size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  {language === 'es' ? 'Comenzar Proyecto' : 'Start Project'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/services">
                  {language === 'es' ? 'Ver Servicios' : 'View Services'}
                </Link>
              </Button>
            </div>
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
