import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: '/vercel/share/v0-next-shadcn',
  },
}

export default nextConfig
