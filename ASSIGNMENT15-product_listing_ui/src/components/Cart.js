import React, { useState } from "react";

function Cart({ cart }) {

  const [payment, setPayment] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    if (payment === "") {
      alert("Please select payment method");
    } else {
      alert("Order placed successfully using " + payment);
    }
  };

  return (
    <div style={styles.cartBox}>

      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <p key={index}>
              {item.name} - ₹{item.price}
            </p>
          ))}

          <h3>Total: ₹{total}</h3>

          <h4>Select Payment Method</h4>

          <select onChange={(e)=>setPayment(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="PhonePe">PhonePe</option>
          </select>

          <br/><br/>

          <button onClick={handlePayment}>
            Checkout
          </button>
        </>
      )}

    </div>
  );
}

const styles = {
  cartBox: {
    background: "white",
    margin: "20px auto",
    padding: "20px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
  }
};

export default Cart;