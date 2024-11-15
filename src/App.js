// src/App.js
import React from 'react';
import AboutMe from './/AboutMe';
import Projects from './/Projects';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Zaeem Amin</h1>
      </header>
      <AboutMe />
      <Projects />
    </div>
  );
}
export default App;
