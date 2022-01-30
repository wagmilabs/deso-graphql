import Users from '../datasource/Users';
import Posts from '../datasource/Posts';

const resolvers = {
  User: {
    Posts: async (parent, args, context) => {
      const posts = await new Posts().getPostsForUser(
        parent.PublicKeyBase58Check
      );

      return posts.Posts;
    },
  },
  SingleUserPayload: {
    User: async (parent, args, context) => {
      return {
        ...parent.Profile,
        IsBlacklisted: parent.IsBlacklisted,
        IsGraylisted: parent.IsGraylisted,
      };
    },
  },
  Query: {
    singleUser: async (root, args, ctx) => {
      const user = await new Users().getSingleProfile(
        args.input.NoErrorOnMissing,
        args.input.PublicKeyBase58Check,
        args.input.Username
      );

      return user;
    },
  },
};

export { resolvers };
