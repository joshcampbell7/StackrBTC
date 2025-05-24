const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getTransaction: Transaction
  }

  type Transaction {
    transactionId: ID!
    walletId: ID!
    amount: Float!
    bitcoinTransactionHash: String!
    transactionTime: String!
  }
`;

module.exports = typeDefs;
