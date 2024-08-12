import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }} /> */}
        {cartItems.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            item={{
              id: cartItem.id,
              title: cartItem.name,
              quantity: cartItem.quantity,
              price: cartItem.price,
              total: cartItem.totalPrice,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
