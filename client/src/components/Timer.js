import React, { useEffect, useState } from "react";

const Timer = ({ startTime, onEnd }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = 60 - elapsed;
            setTimeLeft(remaining);
            if (remaining <= 0) {
                clearInterval(interval);
                onEnd();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime, onEnd]);

    return <div>Time left: {timeLeft}s</div>;
};

export default Timer;
