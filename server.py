from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import random

app = Flask(__name__)
CORS(app)

DATA_FILE = 'game_state.json'
NAMES = ['vuk', 'djura', 'filip', 'guza', 'jova', 'pareza', 'zki', 'kiza']

def load_state():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return None

def save_state(state):
    with open(DATA_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def generate_secret_santa(participants):
    shuffled = participants.copy()
    random.shuffle(shuffled)
    result = {}
    
    for i in range(len(participants)):
        giver = participants[i]
        receiver = shuffled[i]
        
        if giver == receiver:
            next_index = (i + 1) % len(participants)
            receiver = shuffled[next_index]
            shuffled[next_index] = shuffled[i]
            shuffled[i] = receiver
        
        result[giver] = receiver
    
    return result

@app.route('/api/state', methods=['GET'])
def get_state():
    state = load_state()
    if state is None:
        state = {
            'assignments': generate_secret_santa(NAMES),
            'flippedCards': []
        }
        save_state(state)
    return jsonify(state)

@app.route('/api/flip', methods=['POST'])
def flip_card():
    data = request.json
    name = data.get('name')
    
    state = load_state()
    if state and name not in state['flippedCards']:
        state['flippedCards'].append(name)
        save_state(state)
    
    return jsonify({'success': True})

@app.route('/api/randomize', methods=['POST'])
def api_randomize():
    state = {
        'assignments': generate_secret_santa(NAMES),
        'flippedCards': []
    }
    save_state(state)
    return jsonify(state)

@app.route('/randomize')
def randomize():
    state = {
        'assignments': generate_secret_santa(NAMES),
        'flippedCards': []
    }
    save_state(state)
    return 'Game randomized! <a href="http://localhost:5173">Go back</a>'

if __name__ == '__main__':
    app.run(debug=True, port=5353)
