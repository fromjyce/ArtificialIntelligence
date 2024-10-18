# Search Algorithms in Artificial Intelligence

## Overview

This project is part of the **CIA 1 Assignment** for the **Artificial Intelligence** course. It involves the implementation of **12 fundamental search algorithms** commonly used in AI problem-solving. The algorithms were implemented in **C**, converted to **shared objects** for integration with Python, and connected to a ReactJS website via a Flask API.

The algorithms span various search techniques, from uninformed searches like Depth-First and Breadth-First Search to heuristic-based approaches like A* and Best-First Search.

## Search Algorithms Implemented

1. **A* Search (`AStarSearch.js`)**: 
   - Combines the best features of Uniform-Cost Search and Greedy Best-First Search.
   - Uses a heuristic function to find the shortest path in a graph.
   
2. **AO* Search (`AOStarSearch.js`)**: 
   - Handles AND-OR graphs, often used in problem-solving where sub-problems need to be solved in conjunction.

3. **Beam Search (`BeamSearch.js`)**: 
   - A heuristic search that explores a fixed number of best candidates at each level.
   
4. **Best-First Search (`BestFirstSearch.js`)**: 
   - Explores a graph by expanding the most promising node, as measured by a heuristic function.
   
5. **Branch and Bound (`BranchAndBound.js`)**: 
   - An optimization algorithm for solving decision problems and finding the shortest path or least cost.

6. **Branch and Bound (Extended List) (`BranchAndBoundEL.js`)**: 
   - An extended version of the basic Branch and Bound technique.
   
7. **Branch and Bound (Hill Climbing) (`BranchAndBoundHC.js`)**: 
   - Combines Branch and Bound with a Hill Climbing approach to optimize search.

8. **Breadth-First Search (`BreadthFirstSearch.js`)**: 
   - Explores the graph level by level, ensuring the shortest path is found in unweighted graphs.
   
9. **British Museum Search (`BritishMuseumSearch.js`)**: 
   - An exhaustive search technique that explores all possible solutions without using heuristics.
   
10. **Depth-First Search (`DepthFirstSearch.js`)**: 
    - A method that explores as far as possible along a branch before backtracking, often used for pathfinding.
    
11. **Hill Climbing (`HillClimbingMethod.js`)**: 
    - A local search algorithm that moves toward the highest value node, but may get stuck in local maxima.
    
12. **Oracle Search (`OracleSearch.js`)**: 
    - A theoretical search algorithm that assumes perfect knowledge of the solution space.

## Technical Stack

- **Backend**: 
  - Algorithms implemented in **C**, converted to shared objects for use in Python.
  - **Flask API** for handling algorithm execution and connecting the backend to the frontend.
  
- **Frontend**: 
  - **ReactJS** for building the interactive web interface where users can test and visualize the search algorithms.
  
- **Integration**: 
  - The shared object files were imported into **Python** using `ctypes`, and the Flask API communicates with the Python layer.