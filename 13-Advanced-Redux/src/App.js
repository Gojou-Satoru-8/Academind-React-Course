import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/Notification/Notification";
import { uiActions, sendCartData, fetchCartData } from "./store/index";

let isInitial = true; // For blocking API request on the first load

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  // NOTE: useSelector sets up a subscription to the redux store, meaning that upon the state being updated,
  // this component will be re-executed / re-rendered, thus the fetch() inside useEffect() will be called
  // accordingly.

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {};
    if (isInitial) {
      // Will block the code from executing sendCartData for the first time.
      isInitial = false;
      return;
    }
    if (!cart.changed) return;
    dispatch(sendCartData(cart));
  }, [cart, dispatch]); // NOTE: While user-defined functions should be using useCallback, dispatch isn't
  // required to undergo the transformation because redux will take care of that.
  return (
    <>
      {notification && (
        <Notification status={notification.status} title={notification.title} message={notification.message} />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
