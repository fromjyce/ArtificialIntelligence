
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AlgorithmDetail from './AlgorithmDetail';
import '../styles/OptimalAlgoList.css';

const OptimalAlgoList = () => {
    const navigate = useNavigate();
    return (
        <div className="algorithm-details">
            <div className="details-container">
                    <AlgorithmDetail 
                        title="Branch & Bound" 
                        description="It systematically explores the search space while maintaining a list of partial solutions and using bounds to discard suboptimal paths." 
                        link="/branch-bound-method" 
                    />
                    <AlgorithmDetail 
                        title="Branch & Bound + Extended List ( Dead Horse )" 
                        description="This method is an extension of Branch & Bound that involves maintaining an extended list of paths (often to avoid redundant paths)." 
                        link="/branch-bound-dead-horse-method" 
                    />
                    <AlgorithmDetail 
                        title="Branch & Bound + Cost + Heuristics" 
                        description="This method combines Branch & Bound with heuristic estimates of remaining distance." 
                        link="/branch-bound-cost-heuristics-method" 
                    />
                    <AlgorithmDetail 
                        title="A* Search" 
                        description="his is a more advanced variant of Branch & Bound that includes cost estimates, heuristics, and methods to handle redundant paths (Dead Horse)." 
                        link="/a-star-search-method" 
                    />
                    <AlgorithmDetail 
                        title="AO* Search" 
                        description="It is an algorithm that finds the shortest path between two nodes in a graph by combining the actual cost from the start node and an estimated cost to the goal." 
                        link="/a-o-star-search-method" 
                    />
                    </div>
            <button className="back-button" onClick={() => navigate('/')}>Back</button>
        </div>
    );
};

export default OptimalAlgoList;
