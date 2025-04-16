import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./components/Home";
import Room from "./components/Room";

const socket = io("http://localhost:3001");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/room/:id" element={<Room socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;