import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlgorithmDetail from './AlgorithmDetail';
import '../styles/InformedAlgoList.css';

const InformedAlgoList = () => {
    const navigate = useNavigate();
    return (
        <div className="algorithm-details">
            <div className="details-container">
                    <AlgorithmDetail 
                        title="Hill Climbing Method" 
                        description="Hill climbing uses a heuristic to move towards the goal by selecting the most promising path based on the heuristic evaluation." 
                        link="/hill-climbing-method" 
                    />
                    <AlgorithmDetail 
                        title="Beam Search Method" 
                        description="Beam search is a variation of BFS that only keeps a fixed number of best nodes at each level, based on heuristic measures." 
                        link="/beam-search-method" 
                    />
                    <AlgorithmDetail 
                        title="Oracle Search Method" 
                        description="Oracle Search Method refers to a theoretical or idealized approach where an oracle provides perfect knowledge or guidance during the search process." 
                        link="/oracle-search-method" 
                    />
                    <AlgorithmDetail 
                        title="Best First Search" 
                        description="Best First Search explores a search space by prioritizing nodes that appear to be the most promising" 
                        link="/best-first-search" 
                    />
                    </div>
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default InformedAlgoList;
