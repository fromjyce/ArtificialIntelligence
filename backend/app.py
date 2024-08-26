from flask import Flask, request, jsonify
from flask_cors import CORS
import ctypes
from ctypes import c_int, POINTER, Structure

class CPath(Structure):
    _fields_ = [("nodes", c_int * 100),
                ("length", c_int)]

app = Flask(__name__)
CORS(app)

def graph_to_string(graph_dict):
    result = []
    for node, edges in graph_dict.items():
        edges_str = ', '.join(f"('{neighbor}', {weight})" for neighbor, weight in edges)
        result.append(f"'{node}': [{edges_str}]")
    return '{' + ', '.join(result) + '}'

def convert_vertex(vertex):
    try:
        return int(vertex)
    except ValueError:
        return vertex.strip()

def convert_instance(vertex):
    return ord(vertex) if isinstance(vertex, str) else vertex

@app.route('/api/graph', methods=['POST'])
def process_graph():
    path_nodes = (c_int * 100)()
    path_length = c_int()
    data = request.get_json()

    algo_list = ['britishmuseumsearch', 'depthfirstsearch', 'breadthfirstsearch']

    num_vertices = data.get('vertices', '')
    num_edges = data.get('edges', '')
    initial_vertex = convert_vertex(data.get('initial_vertex', ''))
    terminal_vertex = convert_vertex(data.get('terminal_vertex', ''))
    algorithm_name = data.get('algorithm_name', 'Unknown Algorithm')
    graph = {}

    print(f"Received Algorithm Name: {algorithm_name}")
    print(f"Received Initial Vertex: {initial_vertex}")
    print(f"Received Terminal Vertex: {terminal_vertex}")

    # Determine if the vertices are characters or integers
    vertices_are_chars = isinstance(initial_vertex, str)

    initial_vertex = convert_instance(initial_vertex)
    terminal_vertex = convert_instance(terminal_vertex)

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
        graph_str = graph_to_string(graph)
        lib = ctypes.CDLL(f'./shared_object_files/{algorithm_name}.so')

        getattr(lib, f'{algorithm_name}_ctypes').argtypes = [ctypes.c_char_p, c_int, c_int, POINTER(c_int), POINTER(c_int)]
        getattr(lib, f'{algorithm_name}_ctypes').restype = c_int
        found = getattr(lib, f'{algorithm_name}_ctypes')(graph_str.encode('utf-8'), initial_vertex, terminal_vertex, path_nodes, ctypes.byref(path_length))

        if found:
            print("Target node found.")
            if vertices_are_chars:
                print("Path taken:", " -> ".join(chr(path_nodes[i]) for i in range(path_length.value)))
            else:
                print("Path taken:", " -> ".join(str(path_nodes[i]) for i in range(path_length.value)))
        else:
            print("Target node not found.")

        return jsonify({
            'graph': graph,
            'initial_vertex': chr(initial_vertex) if vertices_are_chars else initial_vertex,
            'terminal_vertex': chr(terminal_vertex) if vertices_are_chars else terminal_vertex
        })
    return jsonify({'error': 'Invalid input'})

if __name__ == '__main__':
    app.run(debug=True)
