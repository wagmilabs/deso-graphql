import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Post } from './Post';

const resolvers = mergeResolvers([Post]);

export { resolvers };
