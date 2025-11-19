
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ServicesHero from '@/components/services/services-hero';
import ServicesOverview from '@/components/services/services-overview';
import ProcessSection from '@/components/services/process-section';
import PricingSection from '@/components/services/pricing-section';
import ServicesCTA from '@/components/services/services-cta';

export const metadata = {
  title: 'Services & Commission Process - Art by Fio | Mural Artist Services',
  description: 'Discover Fio\'s mural art services: custom murals, art consultation, and commission process. From concept to installation - transforming spaces worldwide.',
  keywords: 'mural artist services, custom mural commission, art consultation, mural design process, large scale murals, commercial art services'
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <ServicesHero />
        <ServicesOverview />
        <ProcessSection />
        <PricingSection />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
