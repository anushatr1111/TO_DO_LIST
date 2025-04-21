// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} TO_DO... App</p>
        <p>A simple todo application built with React and Firebase</p>
      </div>
    </footer>
  );
}

export default Footer;