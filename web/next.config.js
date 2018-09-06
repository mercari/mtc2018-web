const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    if (options.isServer) { config.plugins.push(new ForkTsCheckerWebpackPlugin()); }
    return config;
  },
  serverRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  }
});
