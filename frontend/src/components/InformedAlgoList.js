
import React from 'react';
import { Link } from 'react-router-dom';

const InformedAlgoList = () => {
    return (
        <div className="blind-algorithm-list">
            <h1>Informed Algorithm Details</h1>
            <p>Details about the selected algorithm will be displayed here.</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default InformedAlgoList;
