const walletService = require("../../services/walletService");

const walletResolvers = {
  Query: {
    hello: () => "Hello, world!",
    getWallet: () => walletService.getWallet(),
  },
};

module.exports = walletResolvers;
