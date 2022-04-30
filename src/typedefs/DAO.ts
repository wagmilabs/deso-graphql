const typeDefs = `
  input DoesUserOwnDAOCoinsInput {
    PublicKeyBase58Check: String!
    DAOPublicKeyBase58Check: String!
    MinHoldingNanos: String
  }

  type Query {
    doesUserOwnDAOCoins(input: DoesUserOwnDAOCoinsInput!): Boolean
  }
`;

export default typeDefs;
