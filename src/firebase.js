import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // If using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCUz02_W8Wc6G4i8fBvqUbYVa3RvBm7zq4",
  authDomain: "todo-list-2e4fa.firebaseapp.com",
  projectId: "todo-list-2e4fa",
  storageBucket: "todo-list-2e4fa.appspot.com", // Fixed domain
  messagingSenderId: "321617906209",
  appId: "1:321617906209:web:e865fd38037baa92b93160",
  measurementId: "G-392F14T2MT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // If using Firestore