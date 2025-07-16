/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // GitHub Pages configuration
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/nichevendor' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/nichevendor/' : '',
  
  // Required for static export with images
  images: {
    unoptimized: true,
  },
  
  // Enable JSON imports
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  
  // Disable dynamic routes for static export
  trailingSlash: true,
  
  // Temporarily ignore TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  
  // Skip middleware
  skipMiddlewareUrlNormalize: true
};

module.exports = nextConfig;
