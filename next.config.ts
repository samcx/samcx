import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    useTypeScriptCli: true,
  },
  async headers() {
    return [
      {
        source: '/fonts/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  partialPrefetching: true,
  reactStrictMode: true,
  typedRoutes: true,
}

export default nextConfig
