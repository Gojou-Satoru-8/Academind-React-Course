import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIME_MS = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log("Timer Set");
    const timer = setTimeout(() => {
      onConfirm();
    }, TIME_MS);

    return () => {
      clearTimeout(timer);
      console.log("Timer cleared as part of useEffect() cleanup function ");
    }; // Cleanup function: triggered on 3 occassions:
    // (1) when useEffect finishes execution for the first time
    // (2) when this component dismounts from the DOM.
    // (3) before subsequent execution of the useEffect() callback
  }, [onConfirm]); // NOTE: passing objects (and thus, functions and arrays as dependency values here)
  // might cause an infinite loop, as when the App component re-renders after onConfirm(), it causes the
  // function to be re-initialized. Functions, like all objects are not equal even if they store the
  // same values/definitions.
  // To solve this issue, use the useCallback hook to wrap the function being passed as dependency here;
  // for this instance it is handleRemovePlace
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button type="button" onClick={onCancel} className="button-text">
          No
        </button>
        <button type="button" onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar maxTime={TIME_MS} />
    </div>
  );
}
