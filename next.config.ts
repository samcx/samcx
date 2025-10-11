import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    clientSegmentCache: true,
    inlineCss: true,
    turbopackFileSystemCacheForBuild: true,
    turbopackFileSystemCacheForDev: true,
  },
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
