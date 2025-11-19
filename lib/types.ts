
// Language types
export type Language = 'en' | 'es';

// Base types (no Prisma dependency)
export interface MuralProject {
  id: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  year: number;
  width: number;
  height: number;
  imageUrl: string;
  location?: string;
  client?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
  language: Language;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  content: string;
  rating: number;
  featured: boolean;
  createdAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  language: Language;
  subscribed: boolean;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exhibition {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdAt: Date;
}

// Extended types with computed fields
export interface MuralProjectWithTranslation extends Omit<MuralProject, 'id' | 'createdAt' | 'updatedAt'> {
  id: string;
  translatedTitle: string;
  translatedDescription: string;
  dimensions: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialWithTranslation extends Testimonial {
  translatedContent: string;
}

export interface BlogPostWithTranslation extends BlogPost {
  translatedTitle: string;
  translatedContent: string;
  translatedExcerpt: string;
  readingTime: number;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
  language: Language;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  language: Language;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Portfolio filter types
export type ProjectCategory = 'All' | 'Commercial' | 'Residential' | 'Public Art';

// Theme types
export type Theme = 'light' | 'dark';

// Navigation items
export interface NavItem {
  title: string;
  titleEs: string;
  href: string;
  description?: string;
}

// Image types
export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

// Artist info structure
export interface ArtistInfo {
  name: string;
  tagline: {
    en: string;
    es: string;
  };
  bio: {
    en: string;
    es: string;
  };
  email: string;
  phone?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tumblr?: string;
  };
  location: string;
  yearsExperience: number;
  specialties: string[];
}

// SEO Meta types
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}
