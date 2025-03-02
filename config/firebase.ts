// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ6K45215p_NNY6LQLsENI96o4-M6VY74",
  authDomain: "myexpense-c37b0.firebaseapp.com",
  projectId: "myexpense-c37b0",
  storageBucket: "myexpense-c37b0.firebasestorage.app",
  messagingSenderId: "282835825267",
  appId: "1:282835825267:web:d283c07da59e5451c1b006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)