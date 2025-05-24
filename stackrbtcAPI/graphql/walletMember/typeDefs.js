const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getWalletMember: WalletMember
  }

  type WalletMember {
    walletMemberId: ID!
    walletId: ID!
    userId: ID!
    joinedAt: String!
  }
`;

module.exports = typeDefs;
