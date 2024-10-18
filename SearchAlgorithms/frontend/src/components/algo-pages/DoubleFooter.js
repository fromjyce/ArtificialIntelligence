import React from 'react';
import '../../styles/algo-pages/DoubleFooter.css';

const DoubleFooter = ({ leftLink, rightLink }) => {
  return (
    <footer className="footer">
      <button 
        className="footer-button" 
        onClick={() => window.location.href = leftLink}
      >
        Back
      </button>
      <button 
        className="footer-button" 
        onClick={() => window.location.href = '/'}
      >
        Home
      </button>
      <button 
        className="footer-button" 
        onClick={() => window.location.href = rightLink}
      >
        Next
      </button>
    </footer>
  );
}

export default DoubleFooter;
