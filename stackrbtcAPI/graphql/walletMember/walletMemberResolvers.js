const walletMemberService = require("../../services/walletMemberService");

const walletMemberResolvers = {
  Query: {
    hello: () => "Hello, world!",
    getWalletMember: () => walletMemberService.getWalletMember(),
  },
};

module.exports = walletMemberResolvers;
