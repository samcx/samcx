/**
 * ./next.config.js
 *
 * See documentation on next-compose-plugins, next-offline,
 * @zeit/next-css & ZEIT Now below for more information:
 *
 * https://github.com/cyrilwanner/next-compose-plugins
 * https://github.com/hanford/next-offline#next-export
 * https://github.com/zeit/next-plugins/tree/master/packages/next-css
 * https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next/
 */

const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css');

const nextConfig = {
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
            maxAgeSeconds: 30 * 24 * 60 * 60
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
};

module.exports = withPlugins([withOffline, withCSS], nextConfig);
