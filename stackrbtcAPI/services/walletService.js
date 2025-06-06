const Wallet = require("../models/Wallet");

const wallet = {
  getWallet: () => new Wallet('tds5dsvdsdsq', "Save for Condo", "btcAddress", "13/06/2024"),
};

module.exports = wallet;
