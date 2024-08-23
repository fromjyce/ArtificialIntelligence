import React from 'react';
import '../styles/AlgorithmDetail.css';

const AlgorithmDetail = ({ title, description }) => (
    <div className="algorithm-detail">
        <div className="detail-text">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className="detail-button-container">
            <button className="detail-button">Learn More</button>
        </div>
    </div>
);

export default AlgorithmDetail;