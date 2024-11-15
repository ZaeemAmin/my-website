// src/components/Projects.js
import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const projectData = [
  {
    title: "Rubik's Cube",
    description: "Enhanced Codebullet’s Java Rubik’s cube code to add advanced algorithms, a solution log, and adjustable turn speed.",
    technologies: ["Java"]
  },
  {
    title: "Snake Game",
    description: "Created a replica of the Snake game using Python with key-controlled movement and randomly generated food blocks.",
    technologies: ["Python"]
  },
  {
    title: "Minesweeper",
    description: "Developed Minesweeper in Java with a clickable grid and a detection system for mines, including game screens and a scoring system.",
    technologies: ["Java"]
  },
  {
    title: "Rock, Paper, Scissors",
    description: "Implemented a rock-paper-scissors game in Java where the robot randomly selects moves and keeps a win-loss score.",
    technologies: ["Java"]
  }
];

function Projects() {
  return (
    <section className="projects">
      <h1>Projects</h1>
      <div className="project-list">
        {projectData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
