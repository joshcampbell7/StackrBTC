class User {
  constructor(userId, username, email, password, encryptedPrivateKey, publicKey, address) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.encryptedPrivateKey = encryptedPrivateKey;
    this.publicKey = publicKey;
    this.address = address;
  }
}

module.exports = User;
