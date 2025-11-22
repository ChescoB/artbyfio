it'use client';

import { portfolioArtworks } from '@/lib/portfolio-data';
import Image from 'next/image';

export default function TestImagesPage() {
  const freemindImages = portfolioArtworks.filter(art => art.category === 'freemind');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Free Mind Series Test ({freemindImages.length} images)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {freemindImages.map((artwork) => (
          <div key={artwork.id} className="border border-gray-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{artwork.title}</h2>
            <p className="text-sm text-gray-400 mb-4 break-all">{artwork.imageUrl}</p>
            
            {/* Test with Next.js Image */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Next.js Image:</p>
              <div className="relative w-full h-64 bg-gray-800 rounded">
                <Image
                  src={encodeURI(artwork.imageUrl)}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Test with regular img tag */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Regular img tag:</p>
              <div className="w-full h-64 bg-gray-800 rounded flex items-center justify-center">
                <img
                  src={encodeURI(artwork.imageUrl)}
                  alt={artwork.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML += '<span class="text-red-500">❌ Failed to load</span>';
                  }}
                  onLoad={(e) => {
                    console.log('✅ Loaded:', artwork.imageUrl);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
