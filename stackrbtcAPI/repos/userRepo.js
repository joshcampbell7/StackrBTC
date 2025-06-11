const pool = require("../config/mysql");
const User = require("../models/User");

const getUserByUserId = async (userId) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE userId = ?`, [userId]);
    if (rows.length === 0) return null;
    const user = rows[0];
    return new User(user.userId, user.username, user.email, user.password);
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    throw new Error("Failed to fetch user");
  }
};

const getUserByUsername = async (username) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE username = ?`, [username]);
    if (rows.length === 0) return null;
    const user = rows[0];
    return new User(user.userId, user.username, user.email, user.password);
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Failed to fetch user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    if (rows.length === 0) return null;
    const user = rows[0];
    return new User(user.userId, user.username, user.email, user.password);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
};

const addUser = async (username, email, hashedPassword) => {
  try {
    const [result] = await pool.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    const userId = result.insertId;
    return new User(userId, username, email, hashedPassword);
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};

module.exports = { getUserByUserId, getUserByUsername, getUserByEmail, addUser };
