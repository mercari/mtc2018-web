const fs = require("fs");

const { makeExecutableSchema, addMockFunctionsToSchema } = require("graphql-tools");

const express = require("express");
const expressGraphQL = require("express-graphql");

const schemaString = fs.readFileSync("./schema.graphql", { encoding: "utf8" });

const schema = makeExecutableSchema({ typeDefs: schemaString });

addMockFunctionsToSchema({ schema });

const app = express();
app.use("/graphql", expressGraphQL({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log("open http://localhost:4000/graphql"));
