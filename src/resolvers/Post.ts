import Users from '../datasource/Users';
import Posts from '../datasource/Posts';

const resolvers = {
  Post: {
    VideoURLs: (parent) => {
      // We need to do some data cleaning to always return an array of strings

      if (parent.VideoURLs === null) {
        return [];
      }

      if (!Array.isArray(parent.VideoURLs)) {
        return [parent.VideoURLs];
      }

      return parent.VideoURLs.filter((url) => url);
    },
    ImageURLs: (parent) => {
      // We need to do some data cleaning to always return an array of strings

      if (parent.ImageURLs === null) {
        return [];
      }

      if (!Array.isArray(parent.ImageURLs)) {
        return [parent.ImageURLs];
      }

      return parent.ImageURLs.filter((url) => url);
    },
    Poster: async (parent, args, context) => {
      const users = new Users();

      const profile = await users.getSingleProfile(
        false,
        parent.PosterPublicKeyBase58Check
      );

      return {
        ...profile.Profile,
        IsBlacklisted: profile.IsBlacklisted,
        IsGraylisted: profile.IsGraylisted,
      };
    },
    RepostedPost: async (parent, args, context) => {
      return parent.RepostedPostEntryResponse;
    },
    Comments: async (parent, args, context) => {
      const posts = new Posts();

      const post = await posts.getSinglePost(parent.PostHashHex);

      return post.PostFound.Comments;
    },
  },
  PostsForUserPayload: {
    Posts: (parent) => {
      return parent.Posts;
    },
  },
  SinglePostPayload: {
    Post: (parent) => {
      return parent.PostFound;
    },
  },
  Query: {
    postsForUser: async (root, args, ctx) => {
      if (!args.input.Username && !args.input.PublicKeyBase58Check) {
        throw new Error('Username or PublicKeyBase58Check must be provided');
      }

      const posts = await new Posts().getPostsForUser(
        args.input.PublicKeyBase58Check,
        args.input.Username,
        args.input.LastPostHashHex,
        args.input.NumToFetch,
        args.input.MediaRequired
      );

      return posts;
    },
    singlePost: async (root, args, ctx) => {
      const post = await new Posts().getSinglePost(
        args.input.PostHashHex,
        args.input.ReaderPublicKeyBase58Check,
        args.input.AddGlobalFeedBool,
        args.input.CommentLimit,
        args.input.CommentOffset,
        args.input.FetchParents,
        args.input.LoadAuthorThread,
        args.input.ThreadLeafLimit,
        args.input.ThreadLevelLimit
      );

      return post;
    },
  },
};

export { resolvers };
