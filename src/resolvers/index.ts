import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Global } from './Global';
import { resolvers as Post } from './Post';
import { resolvers as User } from './User';

const resolvers = mergeResolvers([Global, Post, User]);

export { resolvers };
