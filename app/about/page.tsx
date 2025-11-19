
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import AboutHero from '@/components/about/about-hero';
import ArtistStory from '@/components/about/artist-story';
import Timeline from '@/components/about/timeline';
import Philosophy from '@/components/about/philosophy';
import CurriculumVitae from '@/components/about/curriculum-vitae';
import AboutCTA from '@/components/about/about-cta';

export const metadata = {
  title: 'About Fiorella Podestá - International Mural Artist | Art by Fio',
  description: 'Meet Fiorella Podestá (Fio), internationally acclaimed mural artist with 30+ years of experience. From Chile\'s Valleys to walls worldwide - discover her artistic journey.',
  keywords: 'Fiorella Podesta biography, mural artist background, Chile artist, international muralist, Art by Fio story, Elqui Valley artist'
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <AboutHero />
        <ArtistStory />
        <Timeline />
        <Philosophy />
        <CurriculumVitae />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
