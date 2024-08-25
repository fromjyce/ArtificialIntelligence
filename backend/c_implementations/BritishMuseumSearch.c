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
        index++;

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

int british_museum_search(Graph *graph, int start_node, int target_node, Path *path) {
    int queue[MAX_NODES];
    int front = 0, rear = 0;
    int visited[MAX_NODES] = {0};
    int parent[MAX_NODES];

    queue[rear++] = findNodeIndex(graph, start_node);
    parent[queue[0]] = -1;
    visited[queue[0]] = 1;

    while (front < rear) {
        int current_index = queue[front++];
        int current_node = graph->nodes[current_index].node;

        if (current_node == target_node) {
            int temp_index = current_index;
            path->length = 0;
            while (temp_index != -1) {
                path->nodes[path->length++] = graph->nodes[temp_index].node;
                temp_index = parent[temp_index];
            }
            for (int i = 0; i < path->length / 2; i++) {
                int temp = path->nodes[i];
                path->nodes[i] = path->nodes[path->length - i - 1];
                path->nodes[path->length - i - 1] = temp;
            }
            return 1;
        }

        for (int i = 0; i < graph->nodes[current_index].neighbor_count; i++) {
            int neighbor_index = findNodeIndex(graph, graph->nodes[current_index].neighbors[i]);
            if (!visited[neighbor_index]) {
                queue[rear++] = neighbor_index;
                parent[neighbor_index] = current_index;
                visited[neighbor_index] = 1;
            }
        }
    }
    return 0;
}

__attribute__((visibility("default"))) int british_museum_search_ctypes(char *graph_str, int start_node, int target_node, int *path_nodes, int *path_length) {
    Graph graph;
    Path path;
    path.length = 0;

    parse_graph(graph_str, &graph);

    int found = british_museum_search(&graph, start_node, target_node, &path);

    *path_length = path.length;
    for (int i = 0; i < path.length; i++) {
        path_nodes[i] = path.nodes[i];
    }

    return found;
}

int main() {
    return 0;
}
