import { mergeTypeDefs } from '@graphql-tools/merge';
import Post from './Post';
import User from './User';

const typeDefs = mergeTypeDefs([Post, User]);

export { typeDefs };
