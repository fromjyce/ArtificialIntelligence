#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_NODES 100
#define MAX_EDGES 100
#define QUEUE_SIZE 100

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

typedef struct {
    int items[QUEUE_SIZE];
    int front, rear;
} Queue;

void initQueue(Queue *q) {
    q->front = 0;
    q->rear = 0;
}

int isQueueEmpty(Queue *q) {
    return q->front == q->rear;
}

void enqueue(Queue *q, int value) {
    if (q->rear < QUEUE_SIZE) {
        q->items[q->rear++] = value;
    }
}

int dequeue(Queue *q) {
    if (!isQueueEmpty(q)) {
        return q->items[q->front++];
    }
    return -1;  // Queue is empty
}

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

int bfs(Graph *graph, int start_node, int target_node, Path *path) {
    int visited[MAX_NODES] = {0};
    int parent[MAX_NODES];
    Queue queue;
    initQueue(&queue);

    int start_index = findNodeIndex(graph, start_node);
    if (start_index == -1) {
        return 0;  // Start node not found
    }

    enqueue(&queue, start_index);
    visited[start_index] = 1;
    parent[start_index] = -1;

    while (!isQueueEmpty(&queue)) {
        int current_index = dequeue(&queue);
        if (graph->nodes[current_index].node == target_node) {
            // Reconstruct path
            int index = current_index;
            while (index != -1) {
                path->nodes[path->length++] = graph->nodes[index].node;
                index = parent[index];
            }
            // Reverse path
            for (int i = 0; i < path->length / 2; i++) {
                int temp = path->nodes[i];
                path->nodes[i] = path->nodes[path->length - 1 - i];
                path->nodes[path->length - 1 - i] = temp;
            }
            return 1;
        }

        for (int i = 0; i < graph->nodes[current_index].neighbor_count; i++) {
            int neighbor_index = findNodeIndex(graph, graph->nodes[current_index].neighbors[i]);
            if (!visited[neighbor_index]) {
                enqueue(&queue, neighbor_index);
                visited[neighbor_index] = 1;
                parent[neighbor_index] = current_index;
            }
        }
    }

    return 0;  // Target node not found
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

__attribute__((visibility("default"))) int breadth_first_search_ctypes(char *graph_str, int start_node, int target_node, int *path_nodes, int *path_length) {
    Graph graph;
    Path path;
    path.length = 0;

    parse_graph(graph_str, &graph);

    int found = bfs(&graph, start_node, target_node, &path);

    *path_length = path.length;
    for (int i = 0; i < path.length; i++) {
        path_nodes[i] = path.nodes[i];
    }

    return found;
}

int main() {
    return 0;
}
