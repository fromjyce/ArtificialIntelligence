
import React from 'react';
import { Link } from 'react-router-dom';
import AlgorithmDetail from './AlgorithmDetail';
import '../styles/OptimalAlgoList.css';

const OptimalAlgoList = () => {
    return (
        <div className="blind-algorithm-list">
           <div className="algorithm-details">
            <div className="details-container">
                <AlgorithmDetail 
                    title="British Museum Search" 
                    description="Description of British Museum Search algorithm goes here." 
                />
                <AlgorithmDetail 
                    title="Another Algorithm" 
                    description="Description of another algorithm goes here." 
                />
                <AlgorithmDetail 
                    title="Yet Another Algorithm" 
                    description="Description of yet another algorithm goes here." 
                />
                <AlgorithmDetail 
                    title="Yet Another Algorithm" 
                    description="Description of yet another algorithm goes here." 
                />
                <AlgorithmDetail 
                    title="Yet Another Algorithm" 
                    description="Description of yet another algorithm goes here." 
                />
            </div>
            <Link to="/" className="back-button">Back to Home</Link>
        </div>
        </div>
    );
};

export default OptimalAlgoList;
