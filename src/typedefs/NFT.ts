const typeDefs = `
  type NFT {
    NFTHashHex: String!
    BuyNowPriceNanos: String!
    HighestBidAmountNanos: String!
    IsBuyNow: Boolean!
    IsForSale: Boolean!
    IsPending: Boolean!
    LastAcceptedBidAmountNanos: String!
    LowestBidAmountNanos: String!
    MinBidAmountNanos: String!
    OwnerPublicKeyBase58Check: String!
    SerialNumber: Int!

    Owner: User!
    Post: Post!
  }

  input DoesUserHaveNFTFromCollectionInput {
    PublicKeyBase58Check: String!
    NFTCollectionName: String!
  }

  input GetNFTCollectionSummaryInput {
    NFTHashHex: String!
    ReaderPublicKeyBase58Check: String
  }

  type NFTCollectionSummary {
    NFTHashHex: String!
    OwnerPublicKeyBase58Check: String!

    Owner: User!
    Post: Post!

    HighestBidAmountNanos: String!
    LowestBidAmountNanos: String
    HighestBuyNowPriceNanos: String
    LowestBuyNowPriceNanos: String
    NumCopiesForSale: Int
    NumCopiesBuyNow: Int
    AvailableSerialNumbers: [Int]
  }

  type Query {
    getNFTCollectionSummary(input: GetNFTCollectionSummaryInput!): NFTCollectionSummary!
    doesUserHaveNFTFromCollection(input: DoesUserHaveNFTFromCollectionInput!): Boolean!
  }
`;

export default typeDefs;
