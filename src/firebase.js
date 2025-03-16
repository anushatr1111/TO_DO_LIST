// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Firebase configuration
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
const db = getFirestore(app);

// ✅ Export Firestore and todosCollection
export const todosCollection = collection(db, "todos");
export { db };
export default app;
