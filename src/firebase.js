// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUz02_W8Wc6G4i8fBvqUbYVa3RvBm7zq4",
  authDomain: "todo-list-2e4fa.firebaseapp.com",
  projectId: "todo-list-2e4fa",
  storageBucket: "todo-list-2e4fa.firebasestorage.app",
  messagingSenderId: "321617906209",
  appId: "1:321617906209:web:e865fd38037baa92b93160",
  measurementId: "G-392F14T2MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);