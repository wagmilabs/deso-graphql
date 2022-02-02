import Users from '../datasource/Users';
import Posts from '../datasource/Posts';

const resolvers = {
  NFT: {
    Owner: async (parent, args, context) => {
      const users = await new Users().getSingleProfile(
        true,
        parent.OwnerPublicKeyBase58Check
      );

      return {
        ...users.Profile,
        IsBlacklisted: users.IsBlacklisted,
        IsGraylisted: users.IsGraylisted,
      };
    },
    Post: async (parent, args, context) => {
      const post = await new Posts().getSinglePost(parent.NFTHashHex);

      return post.PostFound;
    },
  },
};

export { resolvers };
