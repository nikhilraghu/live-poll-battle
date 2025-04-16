import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Room = ({ socket }) => {
    const location = useLocation();
    const { name, room } = location.state;
    const [votes, setVotes] = useState({ A: 0, B: 0 });
    const [votedOption, setVotedOption] = useState(localStorage.getItem(room));
    const [timeLeft, setTimeLeft] = useState(60);

    const hasVoted = !!votedOption;

    useEffect(() => {
        socket.on("vote_update", (votes) => setVotes(votes));
        socket.on("start_timer", ({ time }) => {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - time) / 1000);
                const remaining = 60 - elapsed;
                if (remaining <= 0) {
                    clearInterval(interval);
                    setTimeLeft(0);
                } else {
                    setTimeLeft(remaining);
                }
            }, 1000);
        });
    }, [socket, room]);

    const handleVote = (option) => {
        if (!hasVoted && timeLeft > 0) {
            socket.emit("vote", { room, option });
            setVotedOption(option);
            localStorage.setItem(room, option);
        }
    };

    return (
        <div className="room">
            <h2>Poll: Cats vs Dogs</h2>
            <p className="room-code">Room Code: {room}</p>
            <p>Time Left: {timeLeft}s</p>
            <div className="buttons">
                <button disabled={hasVoted || timeLeft <= 0} onClick={() => handleVote("A")}>Cats</button>
                <button disabled={hasVoted || timeLeft <= 0} onClick={() => handleVote("B")}>Dogs</button>
            </div>
            <h3>Votes:</h3>
            <p>Cats: {votes.A}</p>
            <p>Dogs: {votes.B}</p>
            {hasVoted && <p>You have voted for: {votedOption === "A" ? "Cats" : "Dogs"}</p>}
        </div>
    );
};

export default Room;