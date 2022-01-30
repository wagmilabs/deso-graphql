import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};

export { resolvers };
