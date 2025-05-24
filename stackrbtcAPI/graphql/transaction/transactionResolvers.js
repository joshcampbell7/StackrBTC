const transactionService = require("../../services/transactionService");

const transactionResolvers = {
  Query: {
    hello: () => "Hello, world!",
    getTransaction: () => transactionService.getTransaction(),
  },
};

module.exports = transactionResolvers;
