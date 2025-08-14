/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only enable rewrites in production
  async rewrites() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
        },
      ]
    }
    // In development, let the proxy handle it
    return [];
  },
  
  // Add security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Specific CORS headers for API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { 
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? process.env.NEXT_PUBLIC_BASE_URL || 'https://your-production-domain.com'
              : 'http://localhost:3001'
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' 
          },
          { 
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      // Development patterns
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5555',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5555',
        pathname: '/uploads/**',
      },
      // Production patterns
      {
        protocol: 'https',
        hostname: 'insure-auto-go.s3.us-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
      },
    }

export default nextConfig