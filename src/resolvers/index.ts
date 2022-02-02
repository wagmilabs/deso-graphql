import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Global } from './Global';
import { resolvers as Post } from './Post';
import { resolvers as User } from './User';
import { resolvers as NFT } from './NFT';

const resolvers = mergeResolvers([Global, Post, User, NFT]);

export { resolvers };
