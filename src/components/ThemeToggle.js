// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeToggle.css';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
}

export default ThemeToggle;