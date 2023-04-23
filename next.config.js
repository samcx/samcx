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
        permanent: true
      },
      {
        source: '/nr',
        destination: 'https://github.com/vercel/next.js/releases',
        permanent: true
      },
      {
        source: '/ai',
        destination: 'https://play.vercel.ai/',
        permanent: true
      }
    ]
  },
}

module.exports = nextConfig
