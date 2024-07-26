import Header from "./components/Header";
import Shop from "./components/Shop";
import Product from "./components/Product";
// import { CartContext } from "./store/shopping-cart-context";
import { DUMMY_PRODUCTS } from "./dummy-products";
import CartContextProvider from "./store/shopping-cart";

function App() {
  return (
    // <CartContext.Provider value={shoppingCart}>
    // NOTE: Using above way, we still need to pass functions as props to update the cart-items.
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
