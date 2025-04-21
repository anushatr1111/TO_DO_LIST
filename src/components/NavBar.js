import React from 'react';
import { useAuth } from '../context/AuthContext';import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';  // Correct path from components folder
function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Todo App</div>
      <div className="navbar-menu">
        {currentUser ? (
          <>
            <span className="user-email">{currentUser.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="auth-btn">Login</button>
            <button onClick={() => navigate('/register')} className="auth-btn">Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;