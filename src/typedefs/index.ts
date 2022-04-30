import { mergeTypeDefs } from '@graphql-tools/merge';
import Global from './Global';
import Post from './Post';
import User from './User';
import NFT from './NFT';
import DAO from './DAO';

const typeDefs = mergeTypeDefs([Global, Post, User, NFT, DAO]);

export { typeDefs };
