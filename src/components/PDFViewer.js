// src/components/PDFViewer.js
import React, { useState } from 'react';
import './PDFViewer.css';

const PDFViewer = ({ pdfFile }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="pdf-viewer-container">
      {isLoading && (
        <div className="pdf-loading">
          <div className="loading-spinner"></div>
          <p>Loading PDF...</p>
        </div>
      )}
      <iframe
        src={`${pdfFile}#view=FitH`}
        title="Resume PDF"
        className="pdf-iframe"
        onLoad={handleLoad}
      ></iframe>
    </div>
  );
};

export default PDFViewer;