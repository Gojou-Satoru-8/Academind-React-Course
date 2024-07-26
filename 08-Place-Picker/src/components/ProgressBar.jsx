import { useState, useEffect } from "react";

const ProgressBar = function ({ maxTime }) {
  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => clearInterval(interval);
  });

  return <progress max={maxTime} value={remainingTime} />;
};

export default ProgressBar;
