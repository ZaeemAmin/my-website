// src/components/SkillProgress.js
import React, { useState, useEffect, useRef } from 'react';
import './SkillProgress.css';

const SkillProgress = ({ skill, percentage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, []);

  return (
    <div className="skill-progress" ref={progressRef}>
      <div className="skill-info">
        <span className="skill-name">{skill}</span>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className={`progress-fill ${isVisible ? 'animate' : ''}`} 
          style={{ width: isVisible ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default SkillProgress;