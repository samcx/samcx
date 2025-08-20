import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    inlineCss: true,
  },
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
