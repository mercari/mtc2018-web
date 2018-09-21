const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withOffline = require('next-offline');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = withTypescript(withOffline({
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('core-js/fn/array/find');
        entries['main.js'].unshift('core-js/fn/object/assign');
      }

      return entries;
    }

    config.plugins.push(new CopyWebpackPlugin([
      './lib/sw.js',
      './lib/web-app-manifest/'
    ]));

    return config;
  },
  serverRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  workboxOpts: {
    // next-offline default workboxOpts
    // https://github.com/hanford/next-offline/blob/acc4f35ed18ddb55b4573315b469761696310663/index.js#L23-L30
    globPatterns: [
      'static/images/speakers/*thumb.png',
      'static/images/*.svg',
    ],
    globDirectory: '.',
    runtimeCaching: [
      {
        // Match any same-origin request that contains 'api'.
        urlPattern: /^https?.*/,
        // Apply a network-first strategy.
        handler: 'networkFirst',
        options: {
          // Fall back to the cache after 10 seconds.
          networkTimeoutSeconds: 10,
          // Use a custom cache name for this route.
          cacheName: 'mtc2018-runtime-cache',
          // Configure custom cache expiration.
          expiration: {
            maxAgeSeconds: 60 * 60 * 12,
          },
          // Configure which responses are considered cacheable.
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }
    ],
    importScripts: ['/sw.js'],
    clientsClaim: true,
    skipWaiting: true,
  },
}));
