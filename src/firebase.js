import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // 👈 Add this

const firebaseConfig = {
  apiKey: "AIzaSyCUz02_W8Wc6G4i8fBvqUbYVa3RvBm7zq4",
  authDomain: "todo-list-2e4fa.firebaseapp.com",
  projectId: "todo-list-2e4fa",
  storageBucket: "todo-list-2e4fa.firebasestorage.app",
  messagingSenderId: "321617906209",
  appId: "1:321617906209:web:e865fd38037baa92b93160",
  measurementId: "G-392F14T2MT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // 👈 Add this line

export { auth, db }; // 👈 Export both auth and db
