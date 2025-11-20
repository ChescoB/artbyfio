
import Navigation from '@/components/navigation'
import NativeBodyArtHero from '@/components/native-body-art/nature-body-art-hero'
import NativeBodyArtGallery from '@/components/native-body-art/native-body-art-gallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Native Body Art | Fiorella Podestá',
  description: 'An immersive environmental art project where the human form becomes a living canvas, painted with earth-inspired motifs that celebrate our connection with nature.',
}

export default function NativeBodyArtPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <NativeBodyArtHero />
      <NativeBodyArtGallery />
    </main>
  )
}
