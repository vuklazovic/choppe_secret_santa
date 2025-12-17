# CHOPPE SECRET SANTA 🎅🎄

A fun Secret Santa card-flipping game with real-time synchronization across devices.

## Setup

1. Create Python virtual environment and install dependencies:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Install Node dependencies:
```bash
npm install
```

## Running the Application

You need to run both the backend and frontend:

### Terminal 1 - Start Python Server:
```bash
npm run server
```
Or manually:
```bash
source venv/bin/activate
python server.py
```
Server will run on `http://localhost:5353`

### Terminal 2 - Start Vite Dev Server:
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## How It Works

- Open `http://localhost:5173` on multiple devices/browsers
- Click a card to flip and see who you're giving a gift to
- Cards sync across all devices - once flipped, everyone sees it
- Snake border animation shows you have 5 seconds to remember before card locks
- Click **RANDOMIZE** to start over with new assignments
- State persists in `game_state.json` file

## Features

✅ 8 participants with unique cards
✅ Random Secret Santa assignments (no self-assignment)
✅ One-time card flip with 5-second timer
✅ Snake border animation countdown
✅ Cross-device synchronization via Python Flask backend
✅ Persistent storage in JSON file
✅ Randomize button resets everything
