import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Global } from './Global';
import { resolvers as Post } from './Post';
import { resolvers as User } from './User';
import { resolvers as NFT } from './NFT';
import { resolvers as DAO } from './DAO';

const resolvers = mergeResolvers([Global, Post, User, NFT, DAO]);

export { resolvers };
