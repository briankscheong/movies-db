/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_NODEJS_BACKEND_URL: process.env.NODEJS_BACKEND_URL, // Use NEXT_PUBLIC_ prefix for frontend environment variables
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          port: '',
          pathname: '/t/p/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  