const goalService = require("../../services/goalService");

const goalResolvers = {
  Query: {
    hello: () => "Hello, world!",
    getGoal: () => goalService.getGoal(),
  },
};

module.exports = goalResolvers;
