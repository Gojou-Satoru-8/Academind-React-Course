import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/index";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  // OR: Using reduce on the entire items array:
  // const cartItems = useSelector((state) => state.cart.items);
  // const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const handleTogglecart = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleTogglecart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
