
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PortfolioGallery from '@/components/portfolio/portfolio-gallery';
import PortfolioHero from '@/components/portfolio/portfolio-hero';

export const metadata = {
  title: 'Portfolio - Art by Fio | Mural Art Gallery',
  description: 'Explore the stunning portfolio of mural artist Fiorella Podestá. View large-scale commercial, residential, and public art installations across 7 countries.',
  keywords: 'mural portfolio, wall art gallery, Fiorella Podesta murals, commercial art, residential murals, public art installations'
};

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <PortfolioHero />
        <PortfolioGallery />
      </main>
      <Footer />
    </>
  );
}
