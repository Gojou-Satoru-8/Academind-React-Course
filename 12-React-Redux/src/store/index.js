// import * as redux from "redux";
// import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

/*
// NOTE: Without using redux toolkit:
const counterReducer = (state = initialCounterState, action) => {
  if (action.type === "inc") return { counter: state.counter + 1, showCounter: state.showCounter };
  else if (action.type === "dec") return { counter: state.counter - 1, showCounter: state.showCounter };
  else if (action.type === "increase")
    return { counter: state.counter + action.amount, showCounter: state.showCounter };
  else if (action.type === "toggle") return { ...state, showCounter: !state.showCounter };
  return state; // No changes if no match
};

const store = createStore(counterReducer);
*/

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.counter++; // NOTE: if state is being modified, need to wrap within {} for the enclosing function
    },
    decrement: (state) => {
      state.counter--; // Wrap within {} as state is being modified
    },
    increase: (state, action) => {
      state.counter += action.payload.amount;
    },
    toggleCounter: (state) => ({ ...state, showCounter: !state.showCounter }),
    // Here, we're returning a new state snapshow, hence no need of enclosing {} for the function
  },
});

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logIn: (state) => ({ isAuthenticated: true }),
    logOut: (state) => ({ isAuthenticated: false }),
  },
});

// If there's only one reducer in the entire application:
// const store = configureStore({ reducer: counterSlice.reducer });
// For multiple reducers, specify as follows and configureStore will merge all reducers:
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});

// Exporting actions to be used in dispatch functions:
export const counterActions = counterSlice.actions; // to be used in Counter.js in dispatch function calls
export const authActions = authSlice.actions; // to be used in Auth.js in dispatch function calls

// Export default store:
export default store; // To be used in <Provider> (index.js)
