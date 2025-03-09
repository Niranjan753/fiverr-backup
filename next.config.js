/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'source.unsplash.com', 
      'randomuser.me',
      'yuvhstlrwczqxcqqxfjg.supabase.co'
    ],
  },
  transpilePackages: ['@react-pdf/renderer'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-pdf/renderer': '@react-pdf/renderer/lib/react-pdf.js'
    };
    return config;
  }
}

module.exports = nextConfig
