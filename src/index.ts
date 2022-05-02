import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'graphql-yoga';
import { resolvers } from './resolvers';
import { typeDefs } from './typedefs';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer({
  schema,
});

server.start();
