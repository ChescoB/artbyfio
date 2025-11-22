/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
};

module.exports = nextConfig;
