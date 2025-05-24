const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getWallet: Wallet
  }

  type Wallet {
    walletId: ID!
    walletName: String!
    address: String!
    createdAt: String!
  }
`;

module.exports = typeDefs;
