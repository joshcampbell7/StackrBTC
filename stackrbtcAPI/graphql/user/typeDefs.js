const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getUser: User
    getUsers(fields: [String!]!): [User] # Accepts an array of strings (field names)
  }

  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
