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
    UsersThatHODL: async (parent, args, context) => {
      const users = await new Users().getHoldersForProfile(
        parent.PublicKeyBase58Check
      );

      return users.Hodlers;
    },
    TotalFollowers: async (parent, args, context) => {
      const followers = await new Users().getFollowsStateless(
        '',
        parent.PublicKeyBase58Check,
        true
      );

      return followers.NumFollowers;
    },
    Followers: async (parent, args, context) => {
      const followers = await new Users().getFollowsStateless(
        '',
        parent.PublicKeyBase58Check,
        true
      );

      return Object.values(followers.PublicKeyToProfileEntry);
    },
    TotalFollowing: async (parent, args, context) => {
      const following = await new Users().getFollowsStateless(
        parent.Username,
        '',
        false
      );

      return following.NumFollowers;
    },
    Following: async (parent, args, context) => {
      const following = await new Users().getFollowsStateless(
        '',
        parent.PublicKeyBase58Check,
        false
      );

      return Object.values(following.PublicKeyToProfileEntry);
    },
  },
  Holding: {
    HODLer: async (parent, args, context) => {
      const user = await new Users().getSingleProfile(
        true,
        parent.HODLerPublicKeyBase58Check
      );

      return user.Profile;
    },
    Creator: async (parent, args, context) => {
      const user = await new Users().getSingleProfile(
        true,
        parent.CreatorPublicKeyBase58Check
      );

      return user.Profile;
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
