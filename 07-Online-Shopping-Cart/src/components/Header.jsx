import { useRef, useContext } from "react";
import { CartContext } from "../store/shopping-cart";
import CartModal from "./CartModal";

export default function Header() {
  const modal = useRef();
  const { items, checkOutCartItems } = useContext(CartContext);
  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }
  function handleCheckout() {
    checkOutCartItems();
    modal.current.close();
  }

  let modalActions = <button type="submit">Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button type="submit">Close</button>
        <button type="submit" onClick={handleCheckout}>
          Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button type="button" onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </button>
        </p>
      </header>
    </>
  );
}
