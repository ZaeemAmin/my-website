// src/pages/Resume.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Resume.css';

function Resume() {
  const [showPDF, setShowPDF] = useState(false);
  
  return (
    <section className="resume page-transition">
      <div className="resume-header">
        <h2>Resume</h2>
        <div className="resume-actions">
          <a 
            href="/Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="resume-download-btn"
            download="Zaeem_Amin_Resume.pdf"
          >
            <i className="fas fa-download"></i> Download CV
          </a>
          <button 
            className="resume-view-btn"
            onClick={() => setShowPDF(!showPDF)}
          >
            <i className={`fas ${showPDF ? 'fa-eye-slash' : 'fa-eye'}`}></i> 
            {showPDF ? 'Hide Preview' : 'View Preview'}
          </button>
        </div>
      </div>
      
      {showPDF && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="pdf-container"
        >
          <div className="pdf-viewer-container">
            <div className="pdf-loading-overlay" id="pdf-loading">
              <div className="pdf-spinner"></div>
              <p>Loading Resume...</p>
            </div>
            <iframe
              src="/Resume.pdf#view=FitH&navpanes=0&toolbar=0"
              title="Zaeem Amin Resume"
              className="pdf-iframe"
              onLoad={() => {
                const loadingEl = document.getElementById('pdf-loading');
                if (loadingEl) {
                  loadingEl.style.display = 'none';
                }
              }}
            ></iframe>
            <div className="pdf-fallback-center">
              <p>Having trouble viewing the PDF?</p>
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="fallback-link">
                <i className="fas fa-external-link-alt"></i> Open in New Tab
              </a>
            </div>
          </div>
        </motion.div>
      )}

      <div className="resume-content">
        <div className="resume-section">
          <h3 className="section-title">
            <i className="fas fa-graduation-cap"></i> Education
          </h3>
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Bachelor of Science in Cognitive Science</h4>
              <span className="resume-date">2023 - Present (Expected: June 2026)</span>
            </div>
            <h5>University of California, San Diego</h5>
            <p>Specialization in Machine Learning and Neural Computation</p>
            <p>Minor in Computer Science | GPA: 3.67</p>
            <p><strong>Relevant Coursework:</strong> Calculus 1-3, Linear Algebra, Introduction to Java, Data Structures and 
            Algorithms, OS Systems and C, Introduction to Python, Discrete Mathematics, Statistics</p>
          </div>
        </div>

        <div className="resume-section">
          <h3 className="section-title">
            <i className="fas fa-code"></i> Technical Skills
          </h3>
          
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Programming</h4>
              <div className="skill-pills">
                <span className="skill-pill">Java</span>
                <span className="skill-pill">Python</span>
                <span className="skill-pill">C</span>
                <span className="skill-pill">Swift</span>
                <span className="skill-pill">HTML/CSS</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">React.js</span>
                <span className="skill-pill">Node.js</span>
                <span className="skill-pill">RESTful APIs</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h4>ML & Tools</h4>
              <div className="skill-pills">
                <span className="skill-pill">Neural Networks</span>
                <span className="skill-pill">Computer Vision</span>
                <span className="skill-pill">Git</span>
                <span className="skill-pill">MacOS</span>
                <span className="skill-pill">Windows</span>
                <span className="skill-pill">Visual Studio</span>
                <span className="skill-pill">Linux</span>
              </div>
            </div>
            
            <div className="skill-category">
              <h4>Analysis</h4>
              <div className="skill-pills">
                <span className="skill-pill">Statistical Analysis</span>
                <span className="skill-pill">Project Management</span>
                <span className="skill-pill">Quantitative Analysis</span>
                <span className="skill-pill">SQL</span>
                <span className="skill-pill">MongoDB</span>
              </div>
            </div>
          </div>

          <div className="skill-category languages">
            <h4>Languages</h4>
            <div className="skill-pills">
              <span className="skill-pill">English (Fluent)</span>
              <span className="skill-pill">Urdu (Fluent)</span>
              <span className="skill-pill">French (Semi-Fluent)</span>
            </div>
          </div>
        </div>

        <div className="resume-section">
          <h3 className="section-title">
            <i className="fas fa-briefcase"></i> Experience
          </h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Founder</h4>
              <span className="resume-date">August 2020 - May 2021</span>
            </div>
            <h5>Triad Tutoring | Greensboro, NC</h5>
            <p>Co-founded and managed a 15 person virtual team for a tutoring platform serving 50+ students across elementary, middle, and high school levels during quarantine by providing a learning space.</p>
            <p>Orchestrated a structured curriculum development coordinating 8 tutors and school administrators, driving 15% grade improvement through data-driven teaching methods.</p>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Ambassador</h4>
              <span className="resume-date">June 2018 - March 2020</span>
            </div>
            <h5>ICNA Helping Hands | Greensboro, NC</h5>
            <p>Coordinated with team of 20+ volunteers to organize and revolutionize aid distribution, with bi-weekly assessments and training volunteers in logistics, resulting in 30% faster distribution.</p>
            <p>Pioneered and managed a $50,000 budget allocation system through international partnerships and digital tracking enhancing efficiency by 40%, deploying provisions for 75+ families.</p>
          </div>
        </div>

        <div className="resume-section">
          <h3 className="section-title">
            <i className="fas fa-laptop-code"></i> Projects
          </h3>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>PokeMatcher</h4>
              <span className="resume-date">December 2024 - January 2025</span>
            </div>
            <p>Engineered an iOS application with Swift and Core ML matching users to Pokémon through facial feature analysis, processing 100+ facial features and traits to succeed 98% detection.</p>
            <p>Integrated a RESTful API system connected to PokeAPI database with over 1000 Pokémon type matching and machine learning-based recommendation engine, processing 50ms response time.</p>
            <div className="used-technologies">
              <span className="tech">Swift</span>
              <span className="tech">Core ML</span>
              <span className="tech">RESTful API</span>
            </div>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Website Portfolio</h4>
              <span className="resume-date">October 2024 - Present</span>
            </div>
            <p>Architected a portfolio website using React.js, HTML, and JavaScript with modern web practices through Vercel implementation while maintaining sub-2 second load times across all devices.</p>
            <p>Executed a component-based architecture with Redux, custom hooks, and automated testing achieving 90% code coverage, while integrating CI/CD pipeline through GitHub Actions.</p>
            <div className="used-technologies">
              <span className="tech">React.js</span>
              <span className="tech">JavaScript</span>
              <span className="tech">HTML/CSS</span>
              <span className="tech">Vercel</span>
            </div>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Rubik's Cube Solver</h4>
              <span className="resume-date">June 2023 - August 2023</span>
            </div>
            <p>Enhanced existing Java-based Rubik's cube simulator by utilizing CFOP method, advanced algorithms, reducing computation time by 75% and optimizing machine learning predictions.</p>
            <p>Transforming cube mechanics with refined turn speed algorithm and customized movement patterns, reducing average solution steps from 100+ to 65 moves and increasing color neutrality.</p>
            <div className="used-technologies">
              <span className="tech">Java</span>
              <span className="tech">Machine Learning</span>
            </div>
          </div>
          
          <div className="resume-item">
            <div className="resume-item-header">
              <h4>Minesweeper</h4>
              <span className="resume-date">July 2018 - August 2018</span>
            </div>
            <p>Constructed a Java-based Minesweeper featuring recursive tile reveal algorithm, efficient mine detection system using 2D arrays with O(1) lookup time, and adaptive difficulty scaling.</p>
            <p>Engineered a comprehensive game management system with MongoDB integration for persistent storage, real-time analytics tracking player patterns, and custom sprite rendering engine.</p>
            <div className="used-technologies">
              <span className="tech">Java</span>
              <span className="tech">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;