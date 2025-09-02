// src/components/LazyImage.js
import React, { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`lazy-image-container ${className || ''}`}>
      {isInView && (
        <>
          <div className={`lazy-image-placeholder ${isLoaded ? 'hidden' : ''}`}></div>
          <img
            src={src}
            alt={alt}
            className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;