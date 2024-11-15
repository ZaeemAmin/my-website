// src/components/AboutMe.js
import React from 'react';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <h1>About Me</h1>
      <p>Hi! I’m Zaeem Amin, a Cognitive Science major specializing in Machine Learning and Neural Computation at UC San Diego. With a minor in Computer Science, I have a strong foundation in both cognitive principles and technical skills, including Java, Python, and predictive modeling.</p>
      
      <h2>Education</h2>
      <p><strong>University of California, San Diego</strong></p>
      <p>Bachelor of Science in Cognitive Science (Machine Learning and Neural Computation)</p>
      <p>Minor in Computer Science | GPA: 3.67</p>

      <h2>Skills</h2>
      <ul>
        <li>Programming Languages: Java, Python</li>
        <li>Technical Skills: Predictive Modeling, Quantitative Analysis</li>
        <li>Software: Microsoft Visual Studio, Windows, MacOS, Linux</li>
        <li>Languages: English (Fluent), Urdu (Fluent), French (Semi-Fluent)</li>
      </ul>
    </section>
  );
}

export default AboutMe;
