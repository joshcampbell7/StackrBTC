const Transaction = require("../models/Transaction");

const TransactionService = {
  getTransaction: () => new Transaction('transactionId', "walletId", 100, "DEPOSIT", "BTC Hash", "13/03/24"),
};

module.exports = TransactionService;
