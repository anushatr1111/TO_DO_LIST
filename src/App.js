// src/App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <NavBar user={user} />
      <main className="container">
        <h1>To-Do List</h1>
        {user ? (
          <>
            <TodoForm user={user} />
            <TodoList user={user} />
          </>
        ) : (
          <div className="auth-message">
            <p>Please sign in to manage your tasks</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;