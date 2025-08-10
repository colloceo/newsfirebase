// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCPQ7rV1af8NJFcYq4xUB9vSEA64yixho",
  authDomain: "news254-3ddeb.firebaseapp.com",
  projectId: "news254-3ddeb",
  storageBucket: "news254-3ddeb.firebasestorage.app",
  messagingSenderId: "785052026395",
  appId: "1:785052026395:web:6fd00adde9a0c02dbf5abe",
  measurementId: "G-X1964CEYT2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
