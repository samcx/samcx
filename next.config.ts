import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    turbopackFileSystemCacheForBuild: true,
    turbopackFileSystemCacheForDev: true,
    useTypeScriptCli: true,
  },
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
