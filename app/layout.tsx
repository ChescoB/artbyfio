
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/lib/language-context';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: 'Art by Fio | Fiorella Podestá - International Mural Artist',
    template: '%s | Art by Fio'
  },
  description: 'Transform your space with bespoke murals and original art by internationally acclaimed artist Fiorella Podestá. Over 30 years creating immersive art experiences.',
  keywords: 'mural artist, wall art, custom murals, Fiorella Podesta, art commission, large scale art, commercial murals, residential art, Miami artist',
  authors: [{ name: 'Fiorella Podestá' }],
  creator: 'Fiorella Podestá',
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'https://artbyfio.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: '/',
    siteName: 'Art by Fio',
    title: 'Art by Fio | Transform Your Space with Bespoke Murals',
    description: 'International mural artist Fiorella Podestá creates immersive art experiences. Commission custom murals and original works.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Art by Fio - Fiorella Podestá Mural Artist'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art by Fio | Fiorella Podestá - Mural Artist',
    description: 'Transform your space with bespoke murals by internationally acclaimed artist Fiorella Podestá.',
    images: ['/og-image.png'],
    creator: '@artbyfio'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  verification: {
    google: 'google-site-verification-code-here'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <LanguageProvider>
              {children}
              <Toaster />
              <Sonner />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
