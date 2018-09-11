const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withOffline = require('next-offline');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = withTypescript(withOffline({
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    config.plugins.push(new CopyWebpackPlugin(['./lib/sw.js']));

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
    globPatterns: ['static/**/*'],
    globDirectory: '.',
    runtimeCaching: [
      { urlPattern: /^https?.*/, handler: 'networkFirst' }
    ],
    importScripts: ['/sw.js'],
  },
}));
