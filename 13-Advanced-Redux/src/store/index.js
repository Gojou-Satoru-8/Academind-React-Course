import { configureStore, createSlice } from "@reduxjs/toolkit";

// SECTION: SLICES:
const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggleCart: (state) => ({ cartIsVisible: !state.cartIsVisible }),
    showNotification: (state, action) => {
      if (action.payload === null) state.notification = null;
      else
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    // totalAmount: 0,
    changed: false,
  },
  reducers: {
    addItemToCart: (state, action) => {
      // console.log(action.payload);
      const itemToAdd = action.payload;
      const existingItem = state.items.find((item) => item.id === itemToAdd.id);
      state.totalQuantity += 1;
      state.changed = true;
      if (!existingItem)
        state.items.push({
          id: itemToAdd.id, // Fixed
          name: itemToAdd.title, // Fixed
          price: itemToAdd.price, // Fixed
          quantity: 1, // Dynamic
          totalPrice: itemToAdd.price, // Dynamic
        });
      else {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      state.totalQuantity -= 1;
      state.changed = true;
      if (existingItem.quantity === 1) state.items.splice(state.items.indexOf(existingItem), 1);
      else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    replaceCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

// SECTION: STORE
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// EXPORTED ACTIONS
export const uiActions = uiSlice.actions;
export const cartActions = cartSlice.actions;

// ACTION CREATORS:
export const sendCartData = (cart) => {
  return async (dispatch) => {
    // STEP (1): Show notification of pending action
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    try {
      // STEP (2): Make the API Call
      const response = await fetch(
        "https://react-http-7a0f7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity }) }
      );
      if (!response.ok) throw new Error("Sending cart data failed");
      // const data = await response.json();
      // STEP (3): If successful, show success notification
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (err) {
      // STEP (4): If there was an error, show error notification
      console.log(err);
      dispatch(uiActions.showNotification({ state: "error", title: "Error", message: err.message }));
    } finally {
      setTimeout(() => dispatch(uiActions.showNotification(null)), 3000);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    // STEP (1): Show notification of pending action (fetching data):
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Fetching...",
        message: "Fetching cart data!",
      })
    );
    try {
      // STEP (2): Make the API Call:
      const response = await fetch(
        "https://react-http-7a0f7-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) throw new Error("Something went wrong in fetching data!");

      const cartData = await response.json();
      dispatch(cartActions.replaceCart({ items: cartData.items || [], totalQuantity: cartData.totalQuantity }));
      // STEP (3): If successful, replace the current cart state inside store & show notification of success
      dispatch(
        uiActions.showNotification({ status: "success", title: "Success!", message: "Fetched cart data successfully!" })
      );
    } catch (err) {
      console.log(err);
      // STEP (4): If there was an error, show error notification
      dispatch(uiActions.showNotification({ state: "error", title: "Error", message: err.message }));
    } finally {
      setTimeout(() => dispatch(uiActions.showNotification(null)), 3000);
    }
  };
};
export default store;
