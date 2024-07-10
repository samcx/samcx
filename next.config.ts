import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  reactStrictMode: true,
}

export default nextConfig
