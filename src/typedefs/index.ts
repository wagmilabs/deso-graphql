import { mergeTypeDefs } from '@graphql-tools/merge';
import Global from './Global';
import Post from './Post';
import User from './User';

const typeDefs = mergeTypeDefs([Global, Post, User]);

export { typeDefs };
