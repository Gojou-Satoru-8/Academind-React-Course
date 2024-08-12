import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { counterActions } from "../store";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();
  // console.log(dispatch);
  // console.log("---------------");
  // console.log(counter);

  /*
  // NOTE: Using reduc without toolkit
  const incrementHandler = () => dispatch({ type: "inc" });
  const decrementHandler = () => dispatch({ type: "dec" });
  const increaseHandler = () => dispatch({ type: "increase", amount: 5 });
  const toggleCounterHandler = () => dispatch({ type: "toggle" });
  */

  //NOTE: Using redux-toolkit:
  const incrementHandler = () => dispatch(counterActions.increment());
  const decrementHandler = () => dispatch(counterActions.decrement());
  const increaseHandler = () => dispatch(counterActions.increase({ amount: 5 }));
  const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());
  // My additions: (Creating a dispatcher that dispatches increase action type based on input field)
  const inputRef = useRef();
  const raiseByInputAmount = () => {
    const amount = +inputRef.current.value || 0;
    console.log(amount);
    dispatch(counterActions.increase({ amount }));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{showCounter ? counter : "Counter Hidden"}</div>
      <div>
        <button type="button" onClick={incrementHandler}>
          Increment
        </button>
        <button type="button" onClick={increaseHandler}>
          Increase by 5
        </button>
        <button type="button" onClick={decrementHandler}>
          Decrement
        </button>
      </div>
      <div>
        <input type="number" ref={inputRef} />
        <button type="button" onClick={raiseByInputAmount}>
          Raise by amount
        </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
