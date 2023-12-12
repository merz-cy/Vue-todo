// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQI58N43jRUpyptWudBmxqR22pjY4mB-4",
  authDomain: "macantodo-b4332.firebaseapp.com",
  projectId: "macantodo-b4332",
  storageBucket: "macantodo-b4332.appspot.com",
  messagingSenderId: "546959433683",
  appId: "1:546959433683:web:6a12a032aff79e2570d926",
  measurementId: "G-8D73T5HR8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };