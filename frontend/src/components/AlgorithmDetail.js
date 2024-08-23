import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AlgorithmDetail.css';

const AlgorithmDetail = ({ title, description, link }) => (
    <div className="algorithm-detail">
        <div className="detail-text">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className="detail-button-container">
            <Link to={link}>
                <button className="detail-button">Learn More</button>
            </Link>
        </div>
    </div>
);

export default AlgorithmDetail;
