"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SlideshowImage {
  src: string;
  alt: string;
}

interface MuralsSlideshowProps {
  intervalMs?: number;
  className?: string;
  images?: SlideshowImage[]; // allow override if needed later
}

// Images now provided by server wrapper; keep fallback empty array if none passed.
const defaultImages: SlideshowImage[] = [];

function generateAltFromFilename(name: string): string {
  const base = name
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return `Mural - ${base}`;
}

export default function MuralsSlideshow({ intervalMs = 7000, className, images = [] }: MuralsSlideshowProps) {
  const [ordered, setOrdered] = useState<SlideshowImage[]>(images);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(images.length === 0);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch filenames if not provided
  useEffect(() => {
    if (images.length > 0) {
      setOrdered(images);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch('/api/murals')
      .then(r => {
        if (!r.ok) throw new Error('Request failed');
        return r.json();
      })
      .then(data => {
        if (cancelled) return;
        const files: string[] = data?.files ?? [];
        const arr: SlideshowImage[] = files.map(f => ({ src: encodeURI(`/images/PORTAFOLIO/MURALS/${f}`) , alt: generateAltFromFilename(f) }));
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        setOrdered(arr);
        setError(arr.length === 0 ? 'No mural images found' : null);
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message || 'Failed to load murals');
          setOrdered([]);
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  // Advance index
  useEffect(() => {
    if (!ordered.length) return undefined;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex(i => (i + 1) % ordered.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, ordered, intervalMs]);

  // Preload next image
  useEffect(() => {
    if (!ordered.length) return;
    const next = (index + 1) % ordered.length;
    const img = new window.Image();
    img.src = ordered[next].src;
  }, [index, ordered]);

  if (loading) {
    return (
      <div className={clsx('absolute inset-0 flex items-center justify-center bg-black/40 text-white text-sm', className)}>
        Loading murals...
      </div>
    );
  }

  if (!ordered.length) {
    return (
      <div className={clsx('absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm', className)}>
        {error || 'No murals available'}
      </div>
    );
  }

  return (
    <div className={clsx('absolute inset-0 overflow-hidden', className)} aria-label="Mural showcase slideshow">
      {ordered.map((img, i) => {
        const isActive = i === index;
        const isPrev = i === (index - 1 + ordered.length) % ordered.length;
        
        return (
          <motion.div
            key={img.src}
            className="absolute inset-0"
            initial={false}
            animate={{ 
              opacity: isActive ? 1 : 0,
              filter: isActive ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.7)'
            }}
            transition={{ 
              opacity: { duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] },
              filter: { duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ 
                scale: isActive ? 1.08 : 1
              }}
              transition={{ 
                scale: { 
                  duration: isActive ? intervalMs / 1000 : 1.8,
                  ease: isActive ? 'linear' : [0.43, 0.13, 0.23, 0.96]
                }
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0 || i === 1}
                sizes="100vw"
                className="object-cover object-center select-none"
                style={{ objectPosition: 'center center' }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"
                animate={{ opacity: isActive ? 1 : 0.3 }}
                transition={{ duration: 1.8 }}
              />
            </motion.div>
          </motion.div>
        );
      })}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5 z-10 pointer-events-auto max-w-[90vw]">
        {ordered.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show mural ${i + 1}`}
            className={clsx(
              'h-2 w-2 rounded-full transition-transform duration-200',
              i === index
                ? 'bg-white ring-2 ring-white/70 scale-125'
                : 'bg-white/55 hover:bg-white/80 hover:scale-110'
            )}
          />
        ))}
      </div>
    </div>
  );
}
