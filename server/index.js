const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const rooms = {};

io.on("connection", (socket) => {
    socket.on("join_room", ({ name, room }) => {
        socket.join(room);
        if (!rooms[room]) {
            rooms[room] = {
                votes: { A: 0, B: 0 },
                startTime: Date.now(),
            };
        }
        socket.emit("vote_update", rooms[room].votes);
        io.to(room).emit("start_timer", { time: rooms[room].startTime });
    });

    socket.on("vote", ({ room, option }) => {
        if (rooms[room] && rooms[room].votes[option] !== undefined) {
            rooms[room].votes[option]++;
            io.to(room).emit("vote_update", rooms[room].votes);
        }
    });
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});