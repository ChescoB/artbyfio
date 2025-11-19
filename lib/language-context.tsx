
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from './types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio', 
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.tagline': 'Transforming walls into immersive art experiences',
    'hero.subtitle': 'Commission bespoke murals & limited-edition works by Fio',
    'hero.cta.consultation': 'Book a Consultation',
    'hero.cta.portfolio': 'See Full Portfolio',
    
    // Why Choose Fio
    'why.title': 'Why Choose Art By Fio?',
    'why.international': 'International Portfolio',
    'why.scale': 'Large-Scale Installations',
    'why.aesthetic': 'Unique Aesthetic',
    'why.process': 'Streamlined Process',
    
    // Common
    'common.learn_more': 'Learn More',
    'common.get_quote': 'Get Quote',
    'common.view_all': 'View All',
    'common.contact_us': 'Contact Us',
    'common.years_experience': 'Years Experience',
    'common.projects_completed': 'Projects Completed',
    'common.countries': 'Countries',
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    
    // Portfolio
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Explore my collection of transformative mural art',
    'portfolio.filter.all': 'All Projects',
    'portfolio.filter.commercial': 'Commercial',
    'portfolio.filter.residential': 'Residential', 
    'portfolio.filter.public': 'Public Art',
    'portfolio.enquire': 'Enquire about a similar project',
    
    // About
    'about.title': 'About Fio',
    'about.subtitle': 'Artist, Visionary, Storyteller',
    'about.cta': "Let's talk about your space",
    
    // Services
    'services.title': 'Services',
    'services.subtitle': 'Bringing your artistic vision to life',
    'services.process.title': 'Our Process',
    'services.process.consultation': 'Initial Consultation',
    'services.process.design': 'Concept & Design',
    'services.process.production': 'Production',
    'services.process.installation': 'Installation & Finish',
    'services.cta': 'Request a Quote',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Ready to transform your space?',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.project_type': 'Project Type',
    'contact.form.budget': 'Budget Range',
    'contact.form.message': 'Project Description',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully! We\'ll get back to you soon.',
    'contact.form.error': 'Error sending message. Please try again.',
    
    // Footer
    'footer.newsletter': 'Stay updated with latest works',
    'footer.newsletter.placeholder': 'Enter your email',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.social': 'Follow Fio',
    'footer.rights': 'All rights reserved.',
    
    // Theme & Language
    'theme.toggle': 'Toggle theme',
    'language.toggle': 'Toggle language'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Acerca',
    'nav.services': 'Servicios', 
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.tagline': 'Transformando paredes en experiencias artísticas inmersivas',
    'hero.subtitle': 'Encarga murales personalizados y obras de edición limitada por Fio',
    'hero.cta.consultation': 'Reservar Consulta',
    'hero.cta.portfolio': 'Ver Portafolio Completo',
    
    // Why Choose Fio
    'why.title': '¿Por qué elegir Art By Fio?',
    'why.international': 'Portafolio Internacional',
    'why.scale': 'Instalaciones de Gran Escala',
    'why.aesthetic': 'Estética Única',
    'why.process': 'Proceso Simplificado',
    
    // Common
    'common.learn_more': 'Saber Más',
    'common.get_quote': 'Obtener Cotización',
    'common.view_all': 'Ver Todo',
    'common.contact_us': 'Contáctanos',
    'common.years_experience': 'Años de Experiencia',
    'common.projects_completed': 'Proyectos Completados',
    'common.countries': 'Países',
    'common.loading': 'Cargando...',
    'common.error': 'Ocurrió un error',
    
    // Portfolio
    'portfolio.title': 'Portafolio',
    'portfolio.subtitle': 'Explora mi colección de arte mural transformador',
    'portfolio.filter.all': 'Todos los Proyectos',
    'portfolio.filter.commercial': 'Comercial',
    'portfolio.filter.residential': 'Residencial',
    'portfolio.filter.public': 'Arte Público',
    'portfolio.enquire': 'Consultar sobre un proyecto similar',
    
    // About
    'about.title': 'Sobre Fio',
    'about.subtitle': 'Artista, Visionaria, Narradora',
    'about.cta': 'Hablemos sobre tu espacio',
    
    // Services
    'services.title': 'Servicios',
    'services.subtitle': 'Dando vida a tu visión artística',
    'services.process.title': 'Nuestro Proceso',
    'services.process.consultation': 'Consulta Inicial',
    'services.process.design': 'Concepto y Diseño',
    'services.process.production': 'Producción',
    'services.process.installation': 'Instalación y Acabado',
    'services.cta': 'Solicitar Cotización',
    
    // Contact
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Listo para transformar tu espacio?',
    'contact.form.name': 'Nombre Completo',
    'contact.form.email': 'Dirección de Email',
    'contact.form.phone': 'Número de Teléfono',
    'contact.form.project_type': 'Tipo de Proyecto',
    'contact.form.budget': 'Rango de Presupuesto',
    'contact.form.message': 'Descripción del Proyecto',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito! Te responderemos pronto.',
    'contact.form.error': 'Error al enviar mensaje. Por favor intenta de nuevo.',
    
    // Footer
    'footer.newsletter': 'Mantente actualizado con las últimas obras',
    'footer.newsletter.placeholder': 'Ingresa tu email',
    'footer.newsletter.subscribe': 'Suscribirse',
    'footer.social': 'Sigue a Fio',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Theme & Language
    'theme.toggle': 'Cambiar tema',
    'language.toggle': 'Cambiar idioma'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage?.getItem?.('language');
    if (saved === 'en' || saved === 'es') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage?.setItem?.('language', lang);
  };

  const t = (key: string, fallback?: string) => {
    const value = translations?.[language]?.[key as keyof typeof translations['en']];
    return value ?? fallback ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
