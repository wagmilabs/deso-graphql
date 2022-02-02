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

  type Query {
    singleUser(input: SingleUserInput!): SingleUserPayload!
  }
`;

export default typeDefs;
