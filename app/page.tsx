
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import HeroSection from '@/components/sections/hero-section';
import WhyChooseFio from '@/components/sections/why-choose-fio';
import FeaturedWork from '@/components/sections/featured-work';
import StatsSection from '@/components/sections/stats-section';
import TestimonialsSection from '@/components/sections/testimonials-section';
import CTASection from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <WhyChooseFio />
        <FeaturedWork />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
