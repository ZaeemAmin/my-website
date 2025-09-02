// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found page-transition">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn primary-btn">
          <i className="fas fa-home"></i> Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;