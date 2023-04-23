/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/issues',
        destination: 'https://github.com/vercel/next.js/issues',
      },
      {
        source: '/nr',
        destination: 'https://github.com/vercel/next.js/releases',
      },
      {
        source: '/ai',
        destination: 'https://play.vercel.ai/',
      }
    ]
  },
}

module.exports = nextConfig
