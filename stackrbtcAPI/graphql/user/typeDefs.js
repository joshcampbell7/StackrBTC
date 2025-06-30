const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    getUser: User
    getUsers(fields: [String!]!): UsersResponse!
    getUserByUserId(userId: ID!): UserResponse!
  }

  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    encryptedPrivateKey: String
    publicKey: String
    address: String
  }


  type UserResponse {
    success: Boolean!
    data: User
    error: String
    message: String
    statusCode: Int!       # Added statusCode here
  }

  type UsersResponse {
    success: Boolean!
    data: [User]
    error: String
    message: String
    statusCode: Int!       # Added statusCode here
  }

  type LoginResponse {
  success: Boolean!
  data: UserBasic
  token: String
  error: String
  message: String
  statusCode: Int!
  }

  type UserBasic {
  userId: ID!
  username: String!
  email: String!
  address: String!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): UserResponse!
    validateLogin(email: String!, password: String!): LoginResponse!
  }
`;

module.exports = typeDefs;
