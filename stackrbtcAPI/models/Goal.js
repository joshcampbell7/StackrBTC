class Goal {
  constructor(goalId, goalName, walletId, goalAmount, targetDate) {
    this.goalId = goalId;
    this.goalName = goalName;
    this.walletId = walletId;
    this.goalAmount = goalAmount;
    this.targetDate = targetDate;
  }
}

module.exports = Goal;
