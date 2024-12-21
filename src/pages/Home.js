// src/pages/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <section className="home">
      <h2>About Me</h2>
      <img src="/Website Picture.jpeg" alt="Zaeem Amin" className="profile-picture" />
      <p>Hi! I’m Zaeem Amin, a Cognitive Science major specializing in Machine Learning and Neural Computation at UC San Diego and minoring in Computer Science, I have a strong foundation in cognitive science and technical skills.</p>
      
      <h3>Education</h3>
      <p><strong>University of California, San Diego</strong></p>
      <p>Bachelor of Science in Cognitive Science (Machine Learning and Neural Computation)</p>
      <p>Minor in Computer Science | GPA: 3.67</p>
    </section>
  );
}

export default Home;
