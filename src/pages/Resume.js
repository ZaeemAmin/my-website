// src/pages/Resume.js
import React from 'react';
import './Resume.css';

function Resume() {
  return (
    <section className="resume">
      <h2>Resume</h2>
      <p>Download my resume <a href="/Resume.docx.pdf" target="_blank" rel="noopener noreferrer">here</a>.</p>
      <h3>Skills</h3>
      <ul>
        <li>Programming Languages: Java, Python</li>
        <li>Technical Skills: Predictive Modeling, Quantitative Analysis</li>
        <li>Software: Microsoft Visual Studio, Windows, MacOS, Linux</li>
        <li>Languages: English (Fluent), Urdu (Fluent), French (Semi-Fluent)</li>
      </ul>
    </section>
  );
}

export default Resume;
