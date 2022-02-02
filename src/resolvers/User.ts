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
    NFTs: async (parent, args, context) => {
      const nfts = await new Users().getNFTsForUser(
        parent.PublicKeyBase58Check,
        '',
        false,
        false
      );

      const nftArray = [];
      Object.keys(nfts.NFTsMap).forEach((k) => {
        nfts.NFTsMap[k].NFTEntryResponses.forEach((NFTEntryResponse) => {
          nftArray.push({
            NFTHashHex: k,
            ...NFTEntryResponse,
          });
        });
      });

      return nftArray;
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
  HodlersForUserPayload: {
    Hodlers: async (parent, args, context) => {
      // Careful - Hodlers (HODL)
      return parent.Hodlers;
    },
    LastPublicKeyBase58Check: async (parent, args, context) => {
      return parent.LastPublicKeyBase58Check;
    },
  },
  FollowersForUserPayload: {
    Followers: async (parent, args, context) => {
      return Object.values(parent.PublicKeyToProfileEntry);
    },
    LastPublicKeyBase58Check: async (parent, args, context) => {
      // We come up with it since it's not given to us
      return Object.keys(parent.PublicKeyToProfileEntry).pop();
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
    hodlersForUser: async (root, args, ctx) => {
      const holders = await new Users().getHoldersForProfile(
        args.input.PublicKeyBase58Check,
        args.input.Username,
        args.input.NumToFetch,
        args.input.LastPublicKeyBase58Check,
        false,
        args.input.FetchAll
      );

      return holders;
    },
    followersForUser: async (root, args, ctx) => {
      const followers = await new Users().getFollowsStateless(
        args.input.Username,
        args.input.PublicKeyBase58Check,
        true,
        args.input.LastPublicKeyBase58Check,
        args.input.Limit
      );

      return followers;
    },
  },
};

export { resolvers };
