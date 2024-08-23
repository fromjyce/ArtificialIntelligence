import React, { useEffect, useState } from 'react';
import './Home.css';

const SplashScreen = ({ onAnimationEnd, className }) => {
    return (
        <div className={`splash-screen ${className}`} onAnimationEnd={onAnimationEnd}>
            <h1>Search Algorithms in Artificial Intelligence</h1>
        </div>
    );
};

const MainScreen = () => {
    return (
        <div className="main-screen">
        <div className="button-container">
            <button className="main-button">Blind / Uninformed Algorithms</button>
            <p className="button-text">These algorithms explore a search space without having any information about the problem other than the definition of the state space and the actions that can be performed from a given state.</p>
        </div>
        <div className="button-container">
            <button className="main-button">Informed Algorithms</button>
            <p className="button-text">Also known as heuristic search algorithms, these methods use problem-specific knowledge to guide the search process towards the goal. A heuristic function provides an estimate of how close a state is to the goal.</p>
        </div>
        <div className="button-container">
            <button className="main-button">Optimal Algorithms</button>
            <p className="button-text">An optimal search algorithm guarantees to find the shortest path or least-cost solution in terms of the given problem constraints.</p>
        </div>
    </div>
    );
};

const Home = () => {
    const [showSplash, setShowSplash] = useState(true);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        // Start exit animation after 2 seconds
        const timer = setTimeout(() => {
            setAnimationClass('exit');
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    const handleSplashAnimationEnd = () => {
        if (animationClass === 'exit') {
            setShowSplash(false);
        }
    };

    return (
        <div className="Home">
            {showSplash ? <SplashScreen onAnimationEnd={handleSplashAnimationEnd} className={animationClass} /> : <MainScreen />}
        </div>
    );
};

export default Home;
