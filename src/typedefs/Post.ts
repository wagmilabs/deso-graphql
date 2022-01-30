/**
 * The keys below are from the API response and have yet to be added to the typedef
 *
 * AdditionalCoinRoyaltiesMap: {}
    AdditionalDESORoyaltiesMap: {}
    ParentPosts: null
    ParentStakeID: ""
    PostEntryReaderState: {}
 */

const typeDefs = `
  type Post {
    PostHashHex: String!
    Body: String
    ImageURLs: [String]!
    VideoURLs: [String]!
    Poster: User!
    RepostedPost: Post
    PostExtraData: JSONObject

    CommentCount: Int!
    LikeCount: Int!
    QuoteRepostCount: Int!
    RepostCount: Int!
    DiamondCount: Int!

    """
    This only works if you provide a ReaderPublicKeyBase58Check to the input
    """
    DiamondsFromSender: Int!

    HotnessScore: Int!
    PostMultiplier: Int!

    """
    Will only return 10 comments, use specific query to get all comments
    """
    Comments: [Post!]

    NFTRoyaltyToCoinBasisPoints: Int!
    NFTRoyaltyToCreatorBasisPoints: Int!
    NumNFTCopies: Int!
    NumNFTCopiesBurned: Int!
    NumNFTCopiesForSale: Int!
    HasUnlockable: Boolean!

    InGlobalFeed: Boolean!
    InHotFeed: Boolean!
    InMempool: Boolean!
    IsHidden: Boolean!
    IsNFT: Boolean!
    IsPinned: Boolean!

    ConfirmationBlockHeight: Int!
    CreatorBasisPoints: Int!
    StakeMultipleBasisPoints: Int!

    TimestampNanos: Float!
  }

  input PostsForUserInput {
    PublicKeyBase58Check: String
    Username: String
    LastPostHashHex: String
    MediaRequired: Boolean = false
    NumToFetch: Int = 10
  }

  input SinglePostInput {
    PostHashHex: String!
    ReaderPublicKeyBase58Check: String
    AddGlobalFeedBool: Boolean
    CommentLimit: Int = 10
    CommentOffset: Int = 0
    FetchParents: Boolean
    LoadAuthorThread: Boolean = true
    ThreadLeafLimit: Int = 1
    ThreadLevelLimit: Int = 2
  }

  input CommentsForPostInput {
    PostHashHex: String!
    ReaderPublicKeyBase58Check: String
    CommentLimit: Int = 10
    CommentOffset: Int = 0
    LoadAuthorThread: Boolean = false
  }

  type PostsForUserPayload {
    LastPostHashHex: String
    Posts: [Post]!
  }

  type SinglePostPayload {
    Post: Post
  }

  type CommentsForPostPayload {
    Comments: [Post]!
  }

  type Query {
    postsForUser(input: PostsForUserInput!): PostsForUserPayload!
    singlePost(input: SinglePostInput!): SinglePostPayload!
    commentsForPost(input: CommentsForPostInput!): CommentsForPostPayload!
  }
`;

export default typeDefs;
