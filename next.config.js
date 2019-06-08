/**
 * ./next.config.js
 * 
 * See documentation on @zeit/next-css & ZEIT Now below for more information:
 * https://github.com/zeit/next-plugins/tree/master/packages/next-css
 * https://zeit.co/docs/v2/deployments/official-builders/next-js-now-next/
 */

const withCSS = require('@zeit/next-css');
module.exports = withCSS({ target: 'serverless' });
