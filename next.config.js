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
        source: '/gpt',
        destination: 'https://chat.openai.com/chat',
        permanent: true
      }
    ]
  },
}

module.exports = nextConfig
