const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const userTypeDefs = require('./user/typeDefs');
const walletTypeDefs = require('./wallet/typeDefs');
const walletMemberTypeDefs = require('./walletMember/typeDefs');
const transactionTypeDefs = require('./transaction/typeDefs');
const goalTypeDefs = require('./goal/typeDefs');

const userResolvers = require('./user/resolvers');
const walletResolvers = require('./wallet/walletResolvers');
const walletMemberResolvers = require('./walletMember/walletMemberResolvers');
const transactionResolvers = require('./transaction/transactionResolvers');
const goalResolvers = require('./goal/goalResolvers');

const typeDefs = mergeTypeDefs([userTypeDefs, walletTypeDefs,walletMemberTypeDefs, transactionTypeDefs, goalTypeDefs]);
const resolvers = mergeResolvers([userResolvers, walletResolvers,walletMemberResolvers, transactionResolvers, goalResolvers]);

module.exports = { typeDefs, resolvers };
