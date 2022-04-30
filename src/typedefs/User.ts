const typeDefs = `
  type User {
    Username: String!
    PublicKeyBase58Check: String!
    Description: String
    CoinPriceDeSoNanos: Float!
    IsHidden: Boolean!
    IsReserved: Boolean!
    IsVerified: Boolean!
    IsBlacklisted: Boolean!
    IsGraylisted: Boolean!
    IsFeaturedTutorialUpAndComingCreator: Boolean!
    IsFeaturedTutorialWellKnownCreator: Boolean!
    CoinEntry: CoinEntry!

    UsersThatHODL: [Holding]!
    Posts: [Post!]!

    TotalFollowers: Int!
    Followers: [User]!

    TotalFollowing: Int!
    Following: [User]!

    NFTs: [NFT]!

    IsDAO: Boolean!
    DAOCoinEntry: DAOCoinEntry
  }

  type Holding {
    HODLerPublicKeyBase58Check: String!
    HODLer: User!
    CreatorPublicKeyBase58Check: String!
    Creator: User!
    HasPurchased: Boolean!
    BalanceNanos: String!
    BalanceNanosUint256: String!
    NetBalanceInMempool: String
  }

  type DAOCoinEntry {
    NumberOfHolders: Int
    CoinsInCirculationNanos: String!
    MintingDisabled: Boolean
    TransferRestrictionStatus: String!
  }

  type CoinEntry {
    DeSoLockedNanos: Float!
    CoinWatermarkNanos: Float!
    CoinsInCirculationNanos: Float!
    CreatorBasisPoints: Int!
    NumberOfHolders: Int!
  }

  type DAOCoinEntry {
    CoinsInCirculationNanos: String!
    MintingDisabled: Boolean!
    NumberOfHolders: Int!
    TransferRestrictionStatus: String!
  }

  input SingleUserInput {
    Username: String
    PublicKeyBase58Check: String
  }

  type SingleUserPayload {
    User: User
  }

  input HodlersForUserInput {
    PublicKeyBase58Check: String
    Username: String
    LastPublicKeyBase58Check: String
    NumToFetch: Int = 10
    FetchAll: Boolean = false
  }

  type HodlersForUserPayload {
    Hodlers: [Holding]!
    LastPublicKeyBase58Check: String
  }

  input FollowersForUserInput {
    PublicKeyBase58Check: String
    Username: String
    LastPublicKeyBase58Check: String
    Limit: Int = 10
  }

  type FollowersForUserPayload {
    Followers: [User]!
    LastPublicKeyBase58Check: String
  }

  input FollowingForUserInput {
    PublicKeyBase58Check: String
    Username: String
    LastPublicKeyBase58Check: String
    Limit: Int = 10
  }

  type FollowingForUserPayload {
    Following: [User]!
    LastPublicKeyBase58Check: String
  }

  input NFTsForUserInput {
    PublicKeyBase58Check: String
    IsForSale: Boolean
    IsPending: Boolean
  }

  type NFTsForUserPayload {
    NFTs: [NFT]!
  }

  input DAOCoinsHoldingsForUserInput {
    PublicKeyBase58Check: String!
    LastPublicKeyBase58Check: String
  }

  type DAOCoinsHoldingsForUserPayload {
    DAOCoinHoldings: [Holding]!
  }

  type Query {
    singleUser(input: SingleUserInput!): SingleUserPayload!
    hodlersForUser(input: HodlersForUserInput!): HodlersForUserPayload!
    followersForUser(input: FollowersForUserInput!): FollowersForUserPayload!
    followingForUser(input: FollowingForUserInput!): FollowingForUserPayload!
    nftsForUser(input: NFTsForUserInput!): NFTsForUserPayload!
    daoCoinsHoldingsForUser(input: DAOCoinsHoldingsForUserInput!): DAOCoinsHoldingsForUserPayload
  }
`;

export default typeDefs;
