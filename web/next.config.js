const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const contents = require('../server/contents/contents.json');

module.exports = withTypescript({
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
        entries['main.js'].unshift('intersection-observer/intersection-observer');
      }

      return entries;
    }

    if (process.env.NEXT_STATIC) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_STATIC': JSON.stringify(true)
        })
      );
    }

    return config;
  },
  serverRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  exportPathMap: async function (defaultPathMap, { dev }) {
    if (dev) {
      return defaultPathMap
    }

    const pathMap = { ...defaultPathMap };
    delete pathMap['/2018/session/detail'];
    contents.sessions.forEach(session => {
      pathMap[`/2018/session/${session.id}`] = {
        page: '/2018/session/detail',
        query: { id: session.id },
      };
    });

    return pathMap;
  }
});
