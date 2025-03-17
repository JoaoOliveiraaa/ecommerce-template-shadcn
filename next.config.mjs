/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configurações do Next.js
    reactStrictMode: true,
    swcMinify: true,
    
    // Configurações de imagens
    images: {
      domains: ['placehold.co', 'localhost'],
    },
    
    // Configurações experimentais
    experimental: {
      serverActions: true,
    },
  }
  
  export default nextConfig
  
  