const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  exportPathMap: async function (defaultPathMap) {
    return {
      '/2018': { page: '/' },
    }
  },
  webpack(config, options) {
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());
    return config;
  }
});
