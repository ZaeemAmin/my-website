// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Zaeem Amin</h4>
          <p>AI Engineer & Cognitive Science Student</p>
          <p>University of California, San Diego</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/resume">Resume</a></li>
            <li><a href="/projects">Projects</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://github.com/ZaeemAmin" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/zaeem-amin-42114623a/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="mailto:zaeemamin03@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="tel:3363175710">
              <i className="fas fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Zaeem Amin. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;