import { useState, useEffect } from "react";

const QuestionTimer = function ({ timeout, onTimeout }) {
  const [remTime, setRemTime] = useState(timeout);
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   onTimeout();
    // }, timeout);
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemTime((prevRemTime) => {
        return prevRemTime - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);
  // Here, we wanna make the interval and timeout run on every transition to a new question.
  // but the QuestionTimer component is mounted only once, and we can't leave the dependency
  // array empty. So use the key prop to set different values to make changes to the Fiber Tree
  return <progress id="question-time" max={timeout} value={remTime} />;
};

export default QuestionTimer;
