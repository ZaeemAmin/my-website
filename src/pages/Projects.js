// src/pages/Projects.js
import React from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../components/LazyImage';
import './Projects.css';

const projects = [
  {
    title: "PokeMatcher",
    description: "Engineered an iOS application with Swift and Core ML matching users to Pokémon through facial feature analysis, processing 100+ facial features and traits to succeed 98% detection. Integrated a RESTful API system connected to PokeAPI database with over 1000 Pokémon type matching and machine learning-based recommendation engine, processing 50ms response time.",
    technologies: ["Swift", "Core ML", "RESTful API", "iOS"],
    github: "https://github.com/ZaeemAmin",
    demo: "#",
    image: "https://via.placeholder.com/300x200?text=PokeMatcher" // Replace with actual image
  },
  {
    title: "Portfolio Website",
    description: "Architected a portfolio website using React.js, HTML, and JavaScript with modern web practices through Vercel implementation while maintaining sub-2 second load times across all devices. Executed a component-based architecture with Redux, custom hooks, and automated testing achieving 90% code coverage, while integrating CI/CD pipeline through GitHub Actions.",
    technologies: ["React.js", "JavaScript", "HTML/CSS", "Vercel"],
    github: "https://github.com/ZaeemAmin",
    demo: "#",
    image: "https://via.placeholder.com/300x200?text=Portfolio+Website"
  },
  {
    title: "Rubik's Cube Solver",
    description: "Enhanced existing Java-based Rubik's cube simulator by utilizing CFOP method, advanced algorithms, reducing computation time by 75% and optimizing machine learning predictions. Transforming cube mechanics with refined turn speed algorithm and customized movement patterns, reducing average solution steps from 100+ to 65 moves and increasing color neutrality.",
    technologies: ["Java", "Machine Learning"],
    github: "https://github.com/ZaeemAmin",
    demo: "#",
    image: "https://via.placeholder.com/300x200?text=Rubiks+Cube+Solver"
  },
  {
    title: "Minesweeper",
    description: "Constructed a Java-based Minesweeper featuring recursive tile reveal algorithm, efficient mine detection system using 2D arrays with O(1) lookup time, and adaptive difficulty scaling. Engineered a comprehensive game management system with MongoDB integration for persistent storage, real-time analytics tracking player patterns, and custom sprite rendering engine.",
    technologies: ["Java", "MongoDB"],
    github: "https://github.com/ZaeemAmin",
    demo: "#",
    image: "https://via.placeholder.com/300x200?text=Minesweeper"
  }
];

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Animation variants for items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function Projects() {
  return (
    <section className="projects page-transition">
      <h2>Projects</h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="project-card"
            variants={itemVariants}
          >
            <div className="project-image">
              <LazyImage src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn">GitHub</a>
                {project.demo && project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn">Live Demo</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;