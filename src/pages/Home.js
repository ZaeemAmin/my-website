// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import './Home.css';

function Home() {
  return (
    <div className="home page-transition">
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Hi, I'm <span className="highlight">Zaeem Amin</span></h1>
          <h2>AI Engineer & Cognitive Science Student</h2>
          <p className="hero-description">
            I'm passionate about integrating cognitive science with machine learning to create intelligent systems.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="btn primary-btn">Learn More</a>
            <a href="/projects" className="btn secondary-btn">View Projects</a>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="profile-picture-container">
            <img src="/Website Picture.jpeg" alt="Zaeem Amin" className="profile-picture" />
          </div>
        </motion.div>
      </section>

      <motion.section 
        id="about" 
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2>About Me</h2>
        <p>
          As a Cognitive Science major specializing in Machine Learning and Neural Computation at UC San Diego and minoring in Computer Science, I have a strong foundation in cognitive science and technical skills. I'm passionate about developing AI systems that incorporate principles from human cognition.
        </p>
        
        <div className="skills-container">
          <h3>My Skills</h3>
          <div className="skills-grid">
            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-code"></i>
              <h4>Programming</h4>
              <p>Java, Python, C, Swift, JavaScript, React.js, Node.js</p>
            </motion.div>
            
            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-brain"></i>
              <h4>Machine Learning</h4>
              <p>Neural Networks, Computer Vision, RESTful APIs</p>
            </motion.div>
            
            <motion.div 
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <i className="fas fa-laptop-code"></i>
              <h4>Development</h4>
              <p>Git, MongoDB, SQL, Quantitative Analysis</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="education-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2>Education</h2>
        <div className="education-card">
          <h3>University of California, San Diego</h3>
          <p className="education-period">2023 - Present (Exp. Graduation: June 2026)</p>
          <p><strong>Bachelor of Science in Cognitive Science</strong></p>
          <p>Specialization in Machine Learning and Neural Computation</p>
          <p>Minor in Computer Science | GPA: 3.67</p>
          <p><strong>Relevant Coursework:</strong> Calculus 1-3, Linear Algebra, Introduction to Java, Data Structures and Algorithms, OS Systems and C, Introduction to Python, Discrete Mathematics, Statistics</p>
        </div>
      </motion.section>

      <motion.section 
        className="contact-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2>Get In Touch</h2>
        <p>I'm always open to discussing new projects, opportunities, or partnerships.</p>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-methods">
              <a href="mailto:zaeemamin03@gmail.com" className="contact-btn">
                <i className="fas fa-envelope"></i> zaeemamin03@gmail.com
              </a>
              <a href="tel:3363175710" className="contact-btn">
                <i className="fas fa-phone"></i> (336) 317-5710
              </a>
              <a href="https://www.linkedin.com/in/zaeem-amin-42114623a/" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://github.com/ZaeemAmin" target="_blank" rel="noopener noreferrer" className="contact-btn">
                <i className="fab fa-github"></i> GitHub
              </a>
            </div>
          </div>
          
          <div className="contact-form-section">
            <h3>Send Me a Message</h3>
            <ContactForm />
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;