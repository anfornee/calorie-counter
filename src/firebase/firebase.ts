// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countem-b78ab.firebaseapp.com",
  databaseURL: "https://countem-b78ab-default-rtdb.firebaseio.com",
  projectId: "countem-b78ab",
  storageBucket: "countem-b78ab.firebasestorage.app",
  messagingSenderId: "308829712756",
  appId: "1:308829712756:web:4b54a9b5b65a672056fc21",
  measurementId: "G-2FEDRN4KKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const functions = getFunctions(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
