class Transaction {
  constructor(transactionId, walletId, amount, transactionType, bitcoinTransactionHash,transactionDate) {
    this.transactionId = transactionId;
    this.walletId = walletId;
    this.amount = amount;
    this.transactionType = transactionType;
    this.bitcoinTransactionHash = bitcoinTransactionHash;
    this.transactionDate = transactionDate;
  }
}

module.exports = Transaction;
