import React, { useState } from 'react';
import '../../styles/algo-pages/BranchAndBound.css';
import DoubleFooter from './DoubleFooter';

const BranchAndBound = () => {
    const [numVertices, setNumVertices] = useState('');
    const [numEdges, setNumEdges] = useState('');
    const [edgesInput, setEdgesInput] = useState([]);
    const [heuristicsInput, setHeuristicsInput] = useState([]);
    const [initialVertex, setInitialVertex] = useState('');
    const [terminalVertex, setTerminalVertex] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [algorithmName] = useState('branch_and_bound');
    const leftLink = "/optimal-algorithm-list";
    const rightLink = "/branch-bound-dead-horse-method";

    const handleVerticesChange = (e) => {
        const vertices = e.target.value;
        setNumVertices(vertices);

        const heuristicsArray = Array.from({ length: Number(vertices) }, (_, i) => ({
            vertexLabel: '',
            heuristicValue: '',
        }));

        setHeuristicsInput(heuristicsArray);
    };

    const handleEdgesChange = (e) => {
        const edges = e.target.value;
        setNumEdges(edges);

        const edgesArray = Array.from({ length: edges }, (_, i) => ({
            startVertex: '',
            endVertex: '',
            edgeWeight: '0',
        }));

        setEdgesInput(edgesArray);
    };

    const handleEdgeInputChange = (index, field, value) => {
        const updatedEdges = edgesInput.map((edge, i) =>
            i === index ? { ...edge, [field]: value } : edge
        );
        setEdgesInput(updatedEdges);
    };

    const handleHeuristicInputChange = (index, field, value) => {
        const updatedHeuristics = heuristicsInput.map((heuristic, i) =>
            i === index ? { ...heuristic, [field]: value } : heuristic
        );
        setHeuristicsInput(updatedHeuristics);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !numVertices ||
            !numEdges ||
            edgesInput.some(edge => !edge.startVertex || !edge.endVertex) ||
            !initialVertex ||
            !terminalVertex ||
            heuristicsInput.some(heuristic => !heuristic.vertexLabel || heuristic.heuristicValue === '')
        ) {
            setErrorMessage('Please fill in all the input fields before submitting.');
            return;
        }

        const formDataObj = {
            algorithm_name: algorithmName,
            vertices: numVertices,
            edges: numEdges,
            initial_vertex: initialVertex,
            terminal_vertex: terminalVertex,
        };

        edgesInput.forEach((edge, i) => {
            formDataObj[`start_vertex_${i}`] = edge.startVertex;
            formDataObj[`end_vertex_${i}`] = edge.endVertex;
            formDataObj[`edge_weight_${i}`] = edge.edgeWeight;
        });

        const heuristicsObj = {};
        heuristicsInput.forEach(heuristic => {
            if (heuristic.vertexLabel && heuristic.heuristicValue !== '') {
                heuristicsObj[heuristic.vertexLabel] = Number(heuristic.heuristicValue);
            }
        });
        formDataObj['heuristics'] = heuristicsObj;

        try {
            const response = await fetch('http://127.0.0.1:5000/api/graph', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.image_base64) {
                setImageSrc(`data:image/png;base64,${data.image_base64}`);
                setErrorMessage('');
            } else {
                setImageSrc('');
                setErrorMessage('Failed to retrieve image');
            }
        } catch (error) {
            setImageSrc('');
            setErrorMessage('An error occurred while fetching the image.');
        }
    };

    return (
        <div className="british-museum-search-container">
            <div className="left-side-container">
                <h1 className='algorithm-title'>Branch and Bound</h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <div>
                        <input
                            type="number"
                            name="vertices"
                            placeholder="Number of vertices"
                            value={numVertices}
                            onChange={handleVerticesChange}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="edges"
                            placeholder="Number of edges"
                            value={numEdges}
                            onChange={handleEdgesChange}
                        />
                    </div>
                    {edgesInput.map((edge, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder={`Start Vertex ${index + 1}`}
                                value={edge.startVertex}
                                onChange={(e) => handleEdgeInputChange(index, 'startVertex', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder={`End Vertex ${index + 1}`}
                                value={edge.endVertex}
                                onChange={(e) => handleEdgeInputChange(index, 'endVertex', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={`Weight ${index + 1}`}
                                value={edge.edgeWeight}
                                disabled
                            />
                        </div>
                    ))}
                    {numEdges > 0 && (
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                name="initial_vertex"
                                placeholder="Initial vertex"
                                value={initialVertex}
                                onChange={(e) => setInitialVertex(e.target.value)}
                            />
                            <input
                                type="text"
                                name="terminal_vertex"
                                placeholder="Terminal vertex"
                                value={terminalVertex}
                                onChange={(e) => setTerminalVertex(e.target.value)}
                            />
                        </div>
                    )}
                    {heuristicsInput.map((heuristic, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder={`Vertex Label ${index + 1}`}
                                value={heuristic.vertexLabel}
                                onChange={(e) => handleHeuristicInputChange(index, 'vertexLabel', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder={`Heuristic Value ${index + 1}`}
                                value={heuristic.heuristicValue}
                                onChange={(e) => handleHeuristicInputChange(index, 'heuristicValue', e.target.value)}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
            <div className="right-side-container">
                <div className="image-container">
                    {imageSrc && <img src={imageSrc} alt="Graph visualization" />}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
            <DoubleFooter leftLink={leftLink} rightLink={rightLink} />
        </div>
    );
};

export default BranchAndBound;