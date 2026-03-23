import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App(){

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return(
    <div style={styles.container}>

      <h1>Mini E-Commerce Store</h1>

      <ProductList addToCart={addToCart}/>
      <Cart cart={cart}/>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
    padding: "20px",
    textAlign: "center"
  }
};

export default App;