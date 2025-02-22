import math
def MinMax(depth, nodeIndex, isMaximizingPlayer, values, maxDepth):
    if depth == maxDepth:
        print(f"Leaf node reached at depth {depth}, returning value: {values[nodeIndex]}")
        return values[nodeIndex]

    if isMaximizingPlayer:
        best = -math.inf

        print(f"Maximizer at depth {depth}")

        for i in range(2):
            value = MinMax(depth + 1, nodeIndex * 2 + i, False, values, maxDepth)
            print(f"Maximizer at depth {depth}, comparing value: {value} with best: {best}")
            best = max(best, value)
        print(f"Maximizer at depth {depth}, selected best: {best}")
        return best
    else:
        best = math.inf

        print(f"Minimizer at depth {depth}")

        for i in range(2):
            value = MinMax(depth + 1, nodeIndex * 2 + i, True, values, maxDepth)
            print(f"Minimizer at depth {depth}, comparing value: {value} with best: {best}")
            best = min(best, value)
        print(f"Minimizer at depth {depth}, selected best: {best}")
        return best
    

maxDepth = 3
values = [-1,4,2,6,-3,-5,0,7]
optimalValue = MinMax(0, 0, True, values, maxDepth)
print("\nThe optimal value is:", optimalValue)