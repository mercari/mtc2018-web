module.exports = {
  client: {
    addTypename: true,
    includes: ['./{pages,containers}/**/*.{ts,tsx}'],
    service: {
      name: 'mtc2018-web',
      localSchemaFile: '../schema.graphql'
    }
  }
};
