const User = require("../models/User");
const userRepo = require("../repos/userRepo");
const utils = require("../utils/utils");
const pool = require("../config/mysql");

const userService = {
  getUser: () => new User(1, "John Doe", "john@doe.com", "password1"),

  addUser: async (username, email, password) => {
    try {
      const existingEmail = await userRepo.getUserByEmail(email);
      if (existingEmail) {
        return { 
          success: false, 
          error: "EMAIL_IN_USE", 
          message: "Email already in use",
          statusCode: 409 // Conflict
        };
      }

      const existingUsername = await userRepo.getUserByUsername(username);
      if (existingUsername) {
        return { 
          success: false, 
          error: "USERNAME_IN_USE", 
          message: "Username already in use",
          statusCode: 409 // Conflict
        };
      }

      //code here to generatePrivateKey stuff
      const walletJson = await utils.generateUserKeypair()

      const hashedPassword = await utils.hashPassword(password);
      const userData = await userRepo.addUser(username, email, hashedPassword, walletJson.privateKey, walletJson.publicKey, walletJson.address);

      if (!userData) {
        return { 
          success: false, 
          error: "USER_CREATION_FAILED", 
          message: "Unable to add user",
          statusCode: 500 // Internal Server Error
        };
      }

      const newUser = new User(userData.userId, userData.username, userData.email);
      return { 
        success: true, 
        data: newUser,
        message: "User created successfully",
        statusCode: 201 // Created
      };

    } catch (error) {
      console.error("Error adding user:", error);
      return { 
        success: false, 
        error: "INTERNAL_ERROR", 
        message: "Failed to add user due to server error",
        statusCode: 500
      };
    }
  },

  getUsers: async (fields = []) => {
    try {
      const [rows] = await pool.execute(
        fields && fields.length > 0
          ? `SELECT ${["userId", ...fields].join(", ")} FROM users`
          : `SELECT * FROM users`
      );

      const users = rows.map(
        (row) => new User(row.userId, row.username, row.email, row.password, row.address)
      );

      return { 
        success: true, 
        data: users,
        statusCode: 200 // OK
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { 
        success: false, 
        error: "FETCH_USERS_FAILED", 
        message: "Failed to fetch users",
        statusCode: 500
      };
    }
  },

  getUserByUserId: async (userId) => {
    try {
      const user = await userRepo.getUserByUserId(userId);
      if (!user) {
        return { 
          success: false, 
          error: "USER_NOT_FOUND", 
          message: "User not found",
          statusCode: 404
        };
      }
      return { 
        success: true, 
        data: user,
        statusCode: 200
      };
    } catch (error) {
      console.error("Error fetching user by userId:", error);
      return { 
        success: false, 
        error: "FETCH_USER_FAILED", 
        message: "Failed to fetch user",
        statusCode: 500
      };
    }
  },

    validateLogin: async ({email,password}) => {
    try {
      const user = await userRepo.getUserByEmail(email);
      if (!user) {
        return { 
          success: false, 
          error: "USER_NOT_FOUND", 
          message: "User not found",
          statusCode: 404
        };
      }
      // code here to validate pwd, if invalid then return error if true then return JSON


    const isMatch = await utils.isPasswordMatch(password, user.password);
    if (isMatch) {
      console.log("in password match");
      return { 
        success: true, 
        data: user,
        statusCode: 200
      };
    }

        return { 
          success: false, 
          message: "Password do not match",
          statusCode: 401
      };
    } catch (error) {
      console.error("Error fetching user by userId:", error);
      return { 
        success: false, 
        error: "FETCH_USER_FAILED", 
        message: "Failed to fetch user",
        statusCode: 500
      };
    }
  },
};

module.exports = userService;
