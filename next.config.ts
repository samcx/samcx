import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    ppr: true,
  },
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
