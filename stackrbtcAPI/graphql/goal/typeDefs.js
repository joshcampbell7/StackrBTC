const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getGoal: Goal
  }

  type Goal {
    goalId: ID!
    goalName: String!
    walletId: ID!
    goalAmount: Float!
    targetDate: String!
  }
`;

module.exports = typeDefs;
