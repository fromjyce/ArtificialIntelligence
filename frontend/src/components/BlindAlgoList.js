import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlgorithmDetail from './AlgorithmDetail';
import '../styles/BlindAlgoList.css';

const BlindAlgoList = () => {
    const navigate = useNavigate();
    return (
        <div className="algorithm-details">
            <div className="details-container">
                <AlgorithmDetail 
                    title="British Museum Search" 
                    description="It involves finding all possible paths and selecting the best one, making it suitable for smaller search spaces where exhaustive search is feasible." 
                    link="/british-museum-search" 
                />
                <AlgorithmDetail 
                    title="Depth-First Search (DFS)" 
                    description="DFS explores paths by going as deep as possible before backtracking, without any knowledge about the goal." 
                    link="/depth-first-search" 
                />
                <AlgorithmDetail 
                    title="Breadth-First Search (BFS)" 
                    description="BFS explores all nodes at the present depth level before moving on to nodes at the next depth level." 
                    link="/breadth-first-search" 
                />
            </div>
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default BlindAlgoList;
