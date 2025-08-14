/** @type {import('next').NextConfig} */
const nextConfig = {
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