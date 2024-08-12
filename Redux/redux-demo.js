const redux = require("redux");
const prompt = require("prompt-sync")();

const counterReducer = (state = { counter: 0 }, act) => {
  // NOTE: Reducer function takes in the previos state and an action
  // parameter, and returns the new state
  //   return state + 1;    // Can be a simple integer, or object like below
  if (act.type === "inc") return { counter: state.counter + 1 };
  else if (act.type === "dec") return { counter: state.counter - 1 };
};

const store = redux.createStore(counterReducer);
// console.log(store.getState());

// NOTE: Subscriber function is to be executed
// everytime the store changes
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

// store.dispatch({ type: "inc" });
// store.dispatch({ type: "dec" });

let choice;
while (true) {
  choice = prompt("Enter either 'inc' or 'dec' for incrementing or decrementing. Enter 'end' to stop: ");
  while (!choice.match(/^(inc|dec|end)/)) choice = prompt("Please enter a valid choice... inc or dec or end...->");
  if (choice === "end") break;
  else store.dispatch({ type: choice });
}
