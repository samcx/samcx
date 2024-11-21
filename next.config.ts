import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    inlineCss: true,
    ppr: true,
    useLightningcss: true,
  },
  reactStrictMode: true,
}

export default nextConfig
