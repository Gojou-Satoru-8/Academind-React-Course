import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  checkOutCartItems: () => {},
});
// NOTE: Default values passed here, are used by components not directly wrapped by <CartContext.Provider />
// Furthermore, these can provide better auto-completions, hence we're writing dummy values here

const shoppingCartReducer = function (state, action) {
  // NOTE: Much like the setState function as the 2nd item in desctructuring useState, this reducer function
  // is guarenteed to have the latest state.
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((prod) => prod.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });

      return {
        items: updatedItems,
      };
    }
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === "CHECKOUT") {
    alert("Checked Out! Cleared to Payment Page");
    return { items: [] };
  }
  return state;
};
const CartContextProvider = function ({ children }) {
  const [shoppingCart, dispatchCartUpdate] = useReducer(shoppingCartReducer, { items: [] });

  function handleAddItemToCart(id) {
    dispatchCartUpdate({ type: "ADD_ITEM", payload: id });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    dispatchCartUpdate({ type: "UPDATE_ITEM", payload: { productId, amount } });
  }
  function handleCheckout() {
    dispatchCartUpdate({ type: "CHECKOUT" });
  }
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    checkOutCartItems: handleCheckout,
  };
  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
