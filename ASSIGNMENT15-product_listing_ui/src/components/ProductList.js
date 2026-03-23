import React, { useState } from "react";
import productsData from "../data/products";

function ProductList({ addToCart }) {

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter(p =>
    (category === "All" || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <h2>Products</h2>

      <input
        placeholder="Search product..."
        onChange={(e)=>setSearch(e.target.value)}
      />

      <br/><br/>

      <select onChange={(e)=>setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Footwear">Footwear</option>
      </select>

      <div style={styles.container}>

        {filteredProducts.map(p => (
          <div key={p.id} style={styles.card}>
            <img src={p.image} alt="" width="100"/>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={()=>addToCart(p)}>Add to Cart</button>
          </div>
        ))}

      </div>

    </div>
  );
}

const styles = {
  container:{
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center"
  },
  card:{
    background:"white",
    margin:"10px",
    padding:"15px",
    width:"180px",
    borderRadius:"12px",
    boxShadow:"0 5px 15px rgba(0,0,0,0.2)",
    textAlign:"center"
  }
};

export default ProductList;