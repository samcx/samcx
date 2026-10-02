import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    useTypeScriptCli: true,
  },
  partialPrefetching: true,
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
