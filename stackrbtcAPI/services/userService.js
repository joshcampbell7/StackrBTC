const User = require("../models/User");
const { db, collection, addDoc, getDocs } = require("../config/firebase");

const userService = {
  getUser: () => new User(1, "John Doe", "john@doe.com", "password1"),
  addUser: async (username, email, password) => {
    try {
      const newUser = {
        username,
        email,
        password, // Ideally, hash this before storing
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "users"), newUser);

      console.log("User added with ID:", docRef.id);
      return { id: docRef.id, ...newUser };
    } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("Failed to add user");
    }
  },
  getUsers: async (fields) => {
    try {
      const usersCollection = collection(db, "users");
      const snapshot = await getDocs(usersCollection);

      // Map through the documents and select only the requested fields
      const users = snapshot.docs.map((doc) => {
        const userData = doc.data();
        const filteredData = { id: doc.id }; // Always include the `id` field

        // Include only the fields passed in the `fields` array
        fields.forEach((field) => {
          if (userData[field] !== undefined) {
            filteredData[field] = userData[field];
          }
        });

        return filteredData;
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },
};

module.exports = userService;
