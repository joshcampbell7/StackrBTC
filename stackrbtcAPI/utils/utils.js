const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

const isPasswordMatch = async (password, dbPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, dbPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Failed to compare passwords");
  }
};



module.exports = { hashPassword, isPasswordMatch };
