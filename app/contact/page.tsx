
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ContactHero from '@/components/contact/contact-hero';
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';

export const metadata = {
  title: 'Contact Fiorella Podestá - Commission Your Mural | Art by Fio',
  description: 'Ready to transform your space? Contact mural artist Fiorella Podestá for consultations, commissions, and custom art projects. Free initial consultation.',
  keywords: 'contact mural artist, commission art, Fiorella Podesta contact, mural consultation, custom art quote, art by fio contact'
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </main>
      <Footer />
    </>
  );
}
