// Server component wrapper that reads the /public/images/Murals directory
// and passes a dynamic list of images to the client slideshow.
import fs from 'fs';
import path from 'path';
import MuralsSlideshow from './murals-slideshow';

interface SlideshowImage { src: string; alt: string; }

function generateAltFromFilename(name: string): string {
  const base = name
    .replace(/\.[^.]+$/,'')
    .replace(/[_-]+/g,' ') // underscores/dashes to space
    .replace(/\s+/g,' ') // collapse spaces
    .trim();
  return `Mural - ${base}`;
}

export default function MuralsSlideshowWrapper() {
  const muralsDir = path.join(process.cwd(), 'public', 'images', 'Murals');
  let files: string[] = [];
  try {
    files = fs.readdirSync(muralsDir);
  } catch (e) {
    // If directory missing, supply empty list.
    files = [];
  }

  const allowed = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const images: SlideshowImage[] = allowed.map(file => ({
    src: `/images/Murals/${file}`,
    alt: generateAltFromFilename(file)
  }));

  return <MuralsSlideshow images={images} />;
}
