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

  type Query {
    doesUserHaveNFTFromCollection(input: DoesUserHaveNFTFromCollectionInput!): Boolean!
  }
`;

export default typeDefs;
