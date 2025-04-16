# Live Poll Battle

## Overview

**Live Poll Battle** is a real-time voting application where users can join a poll room, cast their votes, and see live updates instantly. The app uses **WebSockets** for real-time communication between clients and the server. Users can create or join a poll room, vote on a question, and watch live results.

## Features Implemented

### Frontend (ReactJS)

- **User Authentication**: Simple name-based entry (no password).
- **Poll Room Creation/Joining**: Generate or enter a unique room code.
- **Voting System**: Vote on a poll with two options (e.g., _Cats vs Dogs_).
- **Live Vote Updates**: Real-time vote count updates across all clients.
- **Re-Voting Prevention**: Users can only vote once.
- **Countdown Timer**: 60-second voting timer; disables voting after time runs out.
- **Vote Persistence**: Votes are saved in `localStorage`, so they remain even after refreshing the page.

### Backend (NodeJS + WebSocket)

- **Poll Room Management**: Handles creation and maintenance of multiple poll rooms.
- **Real-Time Broadcasting**: WebSockets push updates to all connected clients instantly.
- **In-Memory State**: Uses in-memory storage for poll states (no database).
- **Multi-Room Support**: Simultaneous handling of multiple rooms with isolated data.

---

### 1. Clone the Repository

- git clone https://github.com/your-username/live-poll-battle.git
- cd live-poll-battle

----------------------------------\*\*\*\*-------------------------------

## 2. Setting Up the Server

- Navigate to the server folder and install dependencies:

- cd server
- npm install

## Start the backend server:

- npm start
- The server will run on http://localhost:3001

----------------------------------\*\*\*\*-------------------------------

## 3. Setting Up the Client

- Navigate to the client folder and install frontend dependencies:

- cd ../client
- npm install

## Start the React development server:

- npm start

- The client will run on http://localhost:3000

----------------------------------\*\*\*\*-------------------------------
