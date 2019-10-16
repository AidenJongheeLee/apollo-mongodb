import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import * as _ from "lodash";

import ListResolvers from "./resolvers/list";
import ItemResolvers from "./resolvers/item";

import "./db";

const schema = importSchema("src/schema/schema.graphql");

const resolvers = _.merge(ListResolvers, ItemResolvers);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`server is ready at ${url}`);
});
