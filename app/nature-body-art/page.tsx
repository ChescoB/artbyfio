
import Navigation from '@/components/navigation'
import NatureBodyArtHero from '@/components/nature-body-art/nature-body-art-hero'
import NatureBodyArtGallery from '@/components/nature-body-art/nature-body-art-gallery'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nature Body Art | Fiorella Podestá',
  description: 'An immersive environmental art project where the human form becomes a living canvas, painted with earth-inspired motifs that celebrate our connection with nature.',
}

export default function NatureBodyArtPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <NatureBodyArtHero />
      <NatureBodyArtGallery />
    </main>
  )
}
