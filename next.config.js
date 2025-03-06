/** @type {import('next').NextConfig} */
const nextConfig = {
 async redirects() {
    return [
      {
        source: '/',
        destination: '/Homepage',
        permanent: true, // mettez true si c'est une redirection permanente
      },
    ]
  },
  reactStrictMode: true,
  // autres configurations
};

module.exports = nextConfig;