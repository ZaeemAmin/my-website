// src/pages/Projects.js
import React from 'react';
import './Projects.css';

const projects = [
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
    description: "Developed a Minesweeper game in Java by adding a grid and coding a detection system for mines with numbers. Included game screens for rules, completion, and game over.",
    technologies: ["Java"]
  },
  {
    title: "Rock, Paper, Scissors",
    description: "Implemented a Rock, Paper, Scissors game in Java where the user inputs a choice, and the computer randomly selects a move. The game keeps a scoreboard of wins and losses.",
    technologies: ["Java"]
  }
];

function Projects() {
  return (
    <section className="projects">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
        </div>
      ))}
    </section>
  );
}

export default Projects;
