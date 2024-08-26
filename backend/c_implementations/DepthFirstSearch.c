#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_NODES 100
#define MAX_EDGES 100

typedef struct {
    int node;
    int neighbors[MAX_EDGES];
    int neighbor_count;
} GraphNode;

typedef struct {
    GraphNode nodes[MAX_NODES];
    int node_count;
} Graph;

typedef struct {
    int nodes[MAX_NODES];
    int length;
} Path;

int is_digit_or_alpha(char c) {
    return isdigit(c) || isalpha(c);
}

int parse_node(char *str, int *index) {
    while (str[*index] && !is_digit_or_alpha(str[*index])) {
        (*index)++;
    }
    int node;
    if (isalpha(str[*index])) {
        node = str[*index];
        (*index)++;
    } else {
        node = 0;
        while (isdigit(str[*index])) {
            node = node * 10 + (str[*index] - '0');
            (*index)++;
        }
    }
    return node;
}

void parse_graph(char *input, Graph *graph) {
    int index = 0;
    graph->node_count = 0;

    while (input[index]) {
        int node = parse_node(input, &index);
        graph->nodes[graph->node_count].node = node;
        graph->nodes[graph->node_count].neighbor_count = 0;

        while (input[index] != '[') {
            index++;
        }
        index++;  // Skip '['

        while (input[index] != ']') {
            int neighbor = parse_node(input, &index);
            graph->nodes[graph->node_count].neighbors[graph->nodes[graph->node_count].neighbor_count++] = neighbor;
            while (input[index] != ')' && input[index] != ']') {
                index++;
            }
            if (input[index] == ')') {
                index++;  // Skip ')'
            }
        }

        graph->node_count++;
        while (input[index] && input[index] != ',') {
            index++;
        }
        if (input[index] == ',') {
            index++;  // Skip ','
        }
    }
}

int findNodeIndex(Graph *graph, int node) {
    for (int i = 0; i < graph->node_count; i++) {
        if (graph->nodes[i].node == node) {
            return i;
        }
    }
    return -1;
}

int dfs(Graph *graph, int current_index, int target_node, int visited[], Path *path) {
    visited[current_index] = 1;
    path->nodes[path->length++] = graph->nodes[current_index].node;

    if (graph->nodes[current_index].node == target_node) {
        return 1;
    }

    for (int i = 0; i < graph->nodes[current_index].neighbor_count; i++) {
        int neighbor_index = findNodeIndex(graph, graph->nodes[current_index].neighbors[i]);
        if (!visited[neighbor_index]) {
            if (dfs(graph, neighbor_index, target_node, visited, path)) {
                return 1;
            }
        }
    }

    path->length--;  // Backtrack
    return 0;
}

int depth_first_search(Graph *graph, int start_node, int target_node, Path *path) {
    int visited[MAX_NODES] = {0};
    int start_index = findNodeIndex(graph, start_node);

    if (start_index == -1) {
        return 0;  // Start node not found
    }

    path->length = 0;
    return dfs(graph, start_index, target_node, visited, path);
}

void print_path(Path *path) {
    for (int i = 0; i < path->length; i++) {
        if (isalpha(path->nodes[i])) {
            printf("%c ", path->nodes[i]);
        } else {
            printf("%d ", path->nodes[i]);
        }
    }
    printf("\n");
}

__attribute__((visibility("default"))) int depth_first_search_ctypes(char *graph_str, int start_node, int target_node, int *path_nodes, int *path_length) {
    Graph graph;
    Path path;
    path.length = 0;

    parse_graph(graph_str, &graph);

    int found = depth_first_search(&graph, start_node, target_node, &path);

    *path_length = path.length;
    for (int i = 0; i < path.length; i++) {
        path_nodes[i] = path.nodes[i];
    }

    return found;
}

int main() {
    return 0;
}
