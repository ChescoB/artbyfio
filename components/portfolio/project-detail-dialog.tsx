
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { MessageCircle, Palette, X } from 'lucide-react';

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id?: string | number;
    title?: string;
    titleEs?: string | null;
    description?: string;
    descriptionEs?: string | null;
    location?: string;
    year?: number;
    dimensions?: string;
    medium?: string | null;
    client?: string | null;
    category?: string;
    imageUrl?: string;
  } | null;
}

export default function ProjectDetailDialog({ isOpen, onClose, project }: ProjectDetailDialogProps) {
  const { language } = useLanguage();

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 bg-background/95 backdrop-blur-xl border-2">
        <div className="relative h-full max-h-[95vh] flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors shadow-lg backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto overflow-x-hidden">
            {/* Full Image - No Cropping */}
            <div className="relative w-full bg-black/5">
              <div className="relative w-full" style={{ minHeight: '400px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project?.imageUrl?.replace(/#/g, '%23') ?? ''}
                  alt={language === 'es' ? (project?.titleEs ?? project?.title ?? '') : (project?.title ?? '')}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            </div>

            {/* Artwork Info */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title and Category */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-[hsl(var(--art-teal))] bg-clip-text text-transparent">
                    {language === 'es' ? (project?.titleEs ?? project?.title) : project?.title}
                  </h2>
                  {project?.category && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {project.category}
                    </span>
                  )}
                </div>
                
                {/* Year and Medium */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  {project?.year && <span className="font-medium">{project.year}</span>}
                  {project?.medium && (
                    <>
                      {project?.year && <span>•</span>}
                      <div className="flex items-center gap-1.5">
                        <Palette className="w-4 h-4" />
                        <span>{project.medium}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                  {language === 'es' ? (project?.descriptionEs ?? project?.description) : project?.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button asChild variant="art" size="lg" className="flex-1">
                  <Link href="/contact" onClick={onClose}>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {language === 'es' ? 'Consultar sobre proyecto similar' : 'Enquire about similar project'}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/services" onClick={onClose}>
                    {language === 'es' ? 'Ver Servicios' : 'View Services'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
