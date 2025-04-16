import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (name && room) {
            socket.emit("join_room", { name, room });
            navigate(`/room/${room}`, { state: { name, room } });
        }
    };

    const handleCreate = () => {
        const newRoom = Math.random().toString(36).substr(2, 6);
        setRoom(newRoom);
        socket.emit("join_room", { name, room: newRoom });
        navigate(`/room/${newRoom}`, { state: { name, room: newRoom } });
    };

    return (
        <div className="home">
            <h2>Live Poll Battle</h2>
            <p className="room-code">Room Code: {room}</p> {/* display room code */}
            <input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Room code (optional)"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={handleJoin}>Join Room</button>
            <button onClick={handleCreate}>Create Room</button>
        </div>
    );
};

export default Home;
