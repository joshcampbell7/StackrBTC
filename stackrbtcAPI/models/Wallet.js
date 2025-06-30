class Wallet {
  constructor(walletId, walletName, address, publicKey, privateKeyWIF, redeemScript, network, createdAt) {
    this.walletId = walletId;
    this.walletName = walletName;
    this.address = address;
    this.publicKey = publicKey;
    this.privateKeyWIF = privateKeyWIF;
    this.redeemScript = redeemScript;
    this.network = network;
    this.createdAt = createdAt;
  }
}

module.exports = Wallet;
