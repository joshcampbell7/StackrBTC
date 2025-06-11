const userService = require("../../services/userService");

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    getUser: () => userService.getUser(),
    getUsers: async (_, { fields = [] }) => {
      return await userService.getUsers(fields);
    },
    getUserByUserId: async (_, { userId }) => {
      return await userService.getUserByUserId(userId);
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      console.log("Resolver addUser called with:", { username, email, password: "***" });
      
      try {
        const result = await userService.addUser(username, email, password);
        console.log("Service returned:", result);
        
        if (!result) {
          console.error("Service returned null/undefined!");
          return {
            success: false,
            error: "INTERNAL_ERROR",
            message: "Service returned null"
          };
        }
        
        return result;
      } catch (error) {
        console.error("Resolver error:", error);
        return {
          success: false,
          error: "RESOLVER_ERROR",
          message: "Resolver caught an error"
        };
      }
    },

      validateLogin: async (_, { email, password }) => {
        return await userService.validateLogin({ email, password });
  },
  },
};

module.exports = resolvers;