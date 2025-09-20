import type { NextConfig } from "next";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: '.env.local' });

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure webpack for proper resource loading
  webpack: (config, { dev, isServer }) => {
    // Fix for resource loading issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Enable proper hot module replacement in development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  // Make environment variables available to the client
  env: {
    SHEET_ID: process.env.SHEET_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  // Fix for cross-origin requests in development
  allowedDevOrigins: [
    'preview-chat-a5b00827-c3bf-47fa-886f-a69d0d9bf8fa.space.z.ai',
  ],
  // Optimize images and static assets
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
