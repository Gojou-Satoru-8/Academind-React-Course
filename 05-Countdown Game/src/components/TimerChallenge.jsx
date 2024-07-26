import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; // Not a valid solution as this is outside the Component function, and hence will be shared
// by all instances of the component. Thus, timer may hold the setTimeOut pointer to a 10 second timer,
// but on starting a 5 second timer immediately, it will then be erased and point to the 5 second timer,
// with no way to stop the 10 second timer.
const TimerChallenge = function ({ title, targetTime }) {
  /*
  // NOTE: Previous edition:
  const timer = useRef();
  const dialogElement = useRef();

  const [timerActive, setTimerActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(false);

  const handleStartTimer = function () {
    setTimerActive(true);
    timer.current = setTimeout(() => {
      console.log(targetTime + "seconds elapsed");
      setTimerActive(false);
      setTimeElapsed(true);
      //   dialogElement.current.showModal();
      dialogElement.current.open();
    }, targetTime * 1000);
  };

  const handleStopTimer = function () {
    console.log("Timer cancelled");
    clearTimeout(timer.current);
    setTimerActive(false);
    setTimeElapsed(false);
  };

  return (
    <>
      <ResultModal ref={dialogElement} result="lost" targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        {timeElapsed ? <p>You lost!</p> : <p></p>}
        <p className="challenge-time">
          {targetTime} {targetTime > 1 ? "seconds" : "second"}
        </p>
        <p>
          <button type="button" onClick={timerActive ? handleStopTimer : handleStartTimer}>
            {timerActive ? "Stop Timer" : "Start Timer"}
          </button>
        </p>
        <p className={timerActive ? "active" : ""}>{timerActive ? "Time is running..." : "Timer inactive"}</p>
      </section>
    </>
  );
  */
  const timer = useRef();
  const dialogElement = useRef();
  // const outcome = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  // NOTE: targetTime is in sec, timeRemaining and timeElapsed is in ms.
  const timeElapsed = targetTime * 1000 - timeRemaining;
  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    // outcome.current = "lost";
    clearInterval(timer.current);
    dialogElement.current.open();
  }
  const handleStartTimer = function () {
    timer.current = setInterval(() => {
      setTimeRemaining((current) => current - 10);
    }, 10);
  };

  const handleStopTimer = function () {
    clearInterval(timer.current);
    dialogElement.current.open();
  };

  const handleResetTimerOnLoss = function () {
    setTimeRemaining(targetTime * 1000);
  };

  return (
    <>
      <ResultModal
        ref={dialogElement}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleResetTimerOnLoss}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} {targetTime > 1 ? "seconds" : "second"}
        </p>
        <p>
          <button type="button" onClick={timerActive ? handleStopTimer : handleStartTimer}>
            {timerActive ? "Stop Timer" : "Start Timer"}
          </button>
        </p>
        <p className={timerActive ? "active" : ""}>{timerActive ? "Time is running..." : "Timer inactive"}</p>
      </section>
    </>
  );
};

export default TimerChallenge;
