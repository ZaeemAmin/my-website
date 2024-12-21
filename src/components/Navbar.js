// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Zaeem Amin - AI Engineer</h1>
      
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/resume">Resume</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
