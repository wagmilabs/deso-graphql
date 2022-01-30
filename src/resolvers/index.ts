import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Global } from './Global';
import { resolvers as Post } from './Post';

const resolvers = mergeResolvers([Global, Post]);

export { resolvers };
