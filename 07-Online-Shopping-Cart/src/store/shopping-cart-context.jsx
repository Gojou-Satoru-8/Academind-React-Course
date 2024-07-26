// NOTE: This uses the useState() hook. The other file uses the useReducer hook migrated from this file

import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  checkOutCartItems: () => {},
});
// NOTE: Default values passed here, are used by components not directly wrapped by <CartContext.Provider />
// Furthermore, these can provide better auto-completions, hence we're writing dummy values here. Otherwise,
// it's okay to leave em empty.

const CartContextProvider = function ({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === id);
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((prod) => prod.id === id);
        updatedItems.push({
          id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleCheckout() {
    setShoppingCart({
      items: [],
    });
    alert("Checked Out! Cleared to Payment Page");
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
