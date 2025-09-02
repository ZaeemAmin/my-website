// src/components/Navbar.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navbar-container">
        <h1 className="navbar-logo">Zaeem Amin</h1>
        <div className="nav-controls">
          <ThemeToggle />
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>
        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/resume" className="nav-link" onClick={() => setMenuOpen(false)}>
              Resume
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;