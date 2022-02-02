import { mergeTypeDefs } from '@graphql-tools/merge';
import Global from './Global';
import Post from './Post';
import User from './User';
import NFT from './NFT';

const typeDefs = mergeTypeDefs([Global, Post, User, NFT]);

export { typeDefs };
