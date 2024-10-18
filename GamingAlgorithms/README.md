# Minimax and Alpha-Beta Pruning Implementation

## Overview

The assignment is for **CIA 2** of the course **Artificial Intelligence**. The goal is to implement two key game-playing algorithms: **Minimax** and **Alpha-Beta Pruning**. These algorithms are used for decision-making in two-player games, where players take turns, with the objective of optimizing one's moves while anticipating the opponent's best possible moves.

## Algorithms Implemented

1. **Minimax Algorithm**:
   - A recursive algorithm used to choose an optimal move in a two-player game.
   - It assumes that both players play optimally, with one trying to maximize their gain (MAX) and the other trying to minimize it (MIN).
   - Suitable for games like Tic-Tac-Toe, Chess, Checkers, etc.

2. **Alpha-Beta Pruning**:
   - An optimization over Minimax.
   - Reduces the number of nodes evaluated by the Minimax algorithm by "pruning" branches that cannot possibly influence the final decision.
   - This makes the algorithm faster without affecting the result.

## Applications

- **Minimax**: Commonly used in games like Tic-Tac-Toe, Connect Four, Chess, and Checkers.
- **Alpha-Beta Pruning**: Particularly useful in complex games like Chess, where evaluating every possible move is computationally expensive.