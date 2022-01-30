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
    UsersThatHODL: [String]
    Posts: [Post!]!
    CoinEntry: CoinEntry!
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
