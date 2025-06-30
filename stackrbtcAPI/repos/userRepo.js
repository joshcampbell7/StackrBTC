const User = require("../models/User");
const openDb = require("../config/sqlite");

// Fetch user by userId
const getUserByUserId = async (userId) => {
  try {
    const db = await openDb();

    // Use get for a single row
    const user = await db.get(`SELECT * FROM users WHERE userId = ?`, [userId]);
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.email,
      user.password,
      user.encryptedPrivateKey,
      user.publicKey,
      user.address
    );
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    throw new Error("Failed to fetch user");
  }
};

// Fetch user by username
const getUserByUsername = async (username) => {
  try {
    const db = await openDb();
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [username]);
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.email,
      user.password,
      user.encryptedPrivateKey,
      user.publicKey,
      user.address
    );
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Failed to fetch user");
  }
};

// Fetch user by email
const getUserByEmail = async (email) => {
  try {
    const db = await openDb();
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
    if (!user) return null;

    return new User(
      user.userId,
      user.username,
      user.email,
      user.password,
      user.encryptedPrivateKey,
      user.publicKey,
      user.address
    );
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
};

// Add a new user
const addUser = async (username, email, hashedPassword, encryptedPrivateKey, publicKey, address) => {
  try {
    const db = await openDb();

    const result = await db.run(
      `INSERT INTO users (username, email, password, publicKey, encryptedPrivateKey, address) VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, publicKey, encryptedPrivateKey, address]
    );

    const userId = result.lastID;

    return new User(userId, username, email, hashedPassword, encryptedPrivateKey, publicKey, address);
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};

module.exports = { getUserByUserId, getUserByUsername, getUserByEmail, addUser };
