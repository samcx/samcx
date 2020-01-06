/**
 * See documentation on next-offline & ZEIT Now below for more information:
 *
 * https://github.com/hanford/next-offline#next-export
 * https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next/
 */

const withOffline = require('next-offline');

const nextConfig = {
  experimental: { css: true },
  reactStrictMode: true,
  target: 'serverless',
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withOffline(nextConfig);
