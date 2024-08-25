from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def convert_vertex(vertex):
    try:
        return int(vertex)
    except ValueError:
        return vertex.strip()

@app.route('/api/graph', methods=['POST'])
def process_graph():
    data = request.get_json()

    num_vertices = data.get('vertices', '')
    num_edges = data.get('edges', '')
    initial_vertex = data.get('initial_vertex', '')
    terminal_vertex = data.get('terminal_vertex', '')
    graph = {}

    print(f"Received Algorithm Name: {data.get('algorithm_name', 'Unknown Algorithm')}")
    print(f"Received Initial Vertex: {initial_vertex}")
    print(f"Received Terminal Vertex: {terminal_vertex}")

    if num_vertices and num_edges:
        num_vertices = int(num_vertices)
        num_edges = int(num_edges)

        for i in range(num_edges):
            start_vertex = convert_vertex(data.get(f'start_vertex_{i}', ''))
            end_vertex = convert_vertex(data.get(f'end_vertex_{i}', ''))
            edge_weight = int(data.get(f'edge_weight_{i}', 0))

            if start_vertex not in graph:
                graph[start_vertex] = []
            if end_vertex not in graph:
                graph[end_vertex] = []
            graph[start_vertex].append((end_vertex, edge_weight))
            graph[end_vertex].append((start_vertex, edge_weight))

        print(f"Processed Graph: {graph}")
        return jsonify({
            'graph': graph,
            'initial_vertex': initial_vertex,
            'terminal_vertex': terminal_vertex
        })
    return jsonify({'error': 'Invalid input'})

if __name__ == '__main__':
    app.run(debug=True)
