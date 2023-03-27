import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp, handleEndGame }) => {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => handleEndGame(),
  });

  return (
    <div className="timer" style={{ textAlign: "center" }}>
      <div>
        <span>{minutes}</span>:
        <span>
          {seconds < 10 && 0}
          {seconds}
        </span>
      </div>
    </div>
  );
};

export default Timer;
