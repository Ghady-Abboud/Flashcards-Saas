require("dotenv").config();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcards-b171e.firebaseapp.com",
  projectId: "flashcards-b171e",
  storageBucket: "flashcards-b171e.appspot.com",
  messagingSenderId: "478279926673",
  appId: "1:478279926673:web:2cac93a98f62ae6e1cd030",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
