import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// Here this component function passed to forwardref has two parameters: (1) props, and (2) ref:
const ResultModal = forwardRef(function (props, ref) {
  const { targetTime, remainingTime, onReset } = props;
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  // NOTE: The ref, coming from the TimerChallenge.jsx file now refers to this object returned by the
  // useImperativeHandle now, which has methods, that refer to the dialog ref, which is a variable local to this
  // module. Thus, it is used to expose callable functions from inside the child component to the parent component
  useImperativeHandle(ref, () => {
    return {
      open: function () {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You lost</h2> : <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with <strong>{(remainingTime / 1000).toFixed(2)} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
