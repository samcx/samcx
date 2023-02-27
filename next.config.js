/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/nr',
        destination: 'https://github.com/vercel/next.js/releases',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
