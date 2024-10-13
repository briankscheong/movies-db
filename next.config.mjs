/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export", // Ensures static export
    // basePath: '/movies-db-frontend', // Sets the base path for the app
    // assetPrefix: '/movies-db-frontend/', // Prefixes assets (CSS, JS, etc.)
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
  