class Wallet {
  constructor(walletId, walletName, address, createdAt) {
    this.walletId = walletId;
    this.walletName = walletName;
    this.address = address;
    this.createdAt = createdAt;
  }
}

module.exports = Wallet;
