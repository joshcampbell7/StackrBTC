const Wallet = require("../models/Wallet");
const utils = require("../utils/utils");
const pool = require("../config/mysql");
const userRepo = require("../repos/userRepo");
const User = require("../models/User");

const wallet = {
  getWallet: () => new Wallet('tds5dsvdsdsq', "Save for Condo", "btcAddress", "13/06/2024"),


    createNewWallet: async (userNameList, walletName) => {
      const userIdList = []
      const invalidUserNames = []
      // check walletname is not null or empty. 
      // loop through each name in usernameList to check if username is valid, convert into userId
      // new wallet should be created, private keys, puiblic keys, redeem script
      // walletMembers table should be populated with data that saves each user associated with the newely created wallet
      // new wallet information should be saved in the database

    try {

      if(walletName == null || walletName.trim() === '' ){
        return { 
          success: false, 
          error: "BAD_REQUEST", 
          message: "Wallet Name should not be NULL or Empty.",
          statusCode: 409 // Conflict
        };
      }

      for (const username of userNameList) {
        const user = await userRepo.getUserByUsername(username);
        if (!user) {
          invalidUserNames.push(username);
        } else {
          userIdList.push(user.userId);
        }
      }

      if(invalidUserNames.length !== 0){
        return { 
          success: false, 
          error: "BAD_REQUEST", 
          message: "Usernames invalid: " + invalidUserNames.join(', '),
          statusCode: 409 // Conflict
        };
      }

      //code here now to create wallet
      // new wallet should be created, private keys, puiblic keys, redeem script
      // walletMembers table should be populated with data that saves each user associated with the newely created wallet
      // new wallet information should be saved in the database



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


};



module.exports = wallet;
