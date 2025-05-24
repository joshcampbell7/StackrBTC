class WalletMember {
  constructor(walletMemberId, walletId, userId, joinedAt) {
    this.walletMemberId = walletMemberId;
    this.walletId = walletId;
    this.userId = userId;
    this.joinedAt = joinedAt;
  }
}

module.exports = WalletMember;
