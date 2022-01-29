import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new GraphQLServer({
  schema,
});

server.start(() => console.log('Server is running on http://localhost:4000'));
