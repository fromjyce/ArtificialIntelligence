import math

def AlphaBeta(depth, nodeIndex, isMaximizingPlayer, values, maxDepth, alpha, beta):
    if depth == maxDepth:
        print(f"Leaf node reached at depth {depth}, returning value: {values[nodeIndex]}")
        return values[nodeIndex]
    
    if isMaximizingPlayer:
        best = -math.inf
        
        print(f"Maximizer at depth {depth}, Alpha: {alpha}, Beta: {beta}")
        for i in range(2):
            value = AlphaBeta(depth + 1, nodeIndex * 2 + i, False, values, maxDepth, alpha, beta)
            print(f"Maximizer at depth {depth}, comparing value: {value} with best: {best}")
            best = max(best, value)
            alpha = max(alpha, best)
            print(f"Maximizer updated Alpha: {alpha}")
            
            if beta <= alpha:
                print(f"Pruning at depth {depth} with Alpha: {alpha} and Beta: {beta}")
                break
        return best
    else:
        best = math.inf
        
        print(f"Minimizer at depth {depth}, Alpha: {alpha}, Beta: {beta}")
        for i in range(2):
            value = AlphaBeta(depth + 1, nodeIndex * 2 + i, True, values, maxDepth, alpha, beta)
            print(f"Minimizer at depth {depth}, comparing value: {value} with best: {best}")
            best = min(best, value)
            beta = min(beta, best)
            print(f"Minimizer updated Beta: {beta}")
            
            if beta <= alpha:
                print(f"Pruning at depth {depth} with Alpha: {alpha} and Beta: {beta}")
                break
        return best

maxDepth = 3
values = [-1, 4, 2, 6, -3, -5, 0, 7]

alpha, beta = -math.inf, math.inf

optimalValue = AlphaBeta(0, 0, True, values, maxDepth, alpha, beta)