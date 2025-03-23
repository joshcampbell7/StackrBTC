const userService = require("../services/userService");

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getUser: () => userService.getUser(),
    getUsers: async (_, { fields }) => {
      return await userService.getUsers(fields); // Pass the fields array
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      return await userService.addUser(username, email, password);
    },
  },
};

module.exports = resolvers;
