const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} = require("firebase/firestore");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf0X9SEul07u-IFOs_qb3fuTHDzr8oLJw",
  authDomain: "stackrbtc.firebaseapp.com",
  projectId: "stackrbtc",
  storageBucket: "stackrbtc.firebasestorage.app",
  messagingSenderId: "445542852463",
  appId: "1:445542852463:web:52185870e16e68e36faa9a",
  measurementId: "G-S9MXHN3EVF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, collection, addDoc, getDocs };
