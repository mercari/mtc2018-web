const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const contents = require('../server/contents/contents.json');

module.exports = {
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

    return config;
  },
  serverRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  publicRuntimeConfig: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  async exportPathMap(defaultPathMap, { dev }) {
    if (dev) {
      return defaultPathMap
    }

    const pathMap = { ...defaultPathMap };
    delete pathMap['/2018/session/[id]'];
    console.log(pathMap);
    contents.sessions.forEach(session => {
      pathMap[`/2018/session/${session.id}`] = {
        page: `/2018/session/${session.id}`,
        // query: { id: session.id },
      };
    });

    return pathMap;
  }
};
