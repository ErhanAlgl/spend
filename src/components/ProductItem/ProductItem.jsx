import React, { useState } from "react";
import "./ProductItem.style.css";

const ProductItem = ({ product, balance, onBuy, onSell }) => {
  const [quantity, setQuantity] = useState(0); // state to keep track of the quantity of the product
  const [inputQuantity, setInputQuantity] = useState(""); // state to keep track of the input quantity

  // function to handle the buy action
  const handleBuy = () => {
    const buyQuantity = parseInt(inputQuantity, 10) || 1;
    if (
      balance >= product.price * buyQuantity &&
      (!product.stock || quantity + buyQuantity <= product.stock)
    ) {
      setQuantity((prevQuantity) => prevQuantity + buyQuantity);
      onBuy(product, buyQuantity);
      setInputQuantity("");
    }
  };

  // function to handle the sell action
  const handleSell = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onSell(product, 1);
    }
  };

  // function to handle the quantity change action
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    const difference = newQuantity - quantity;

    if (
      difference > 0 &&
      balance >= product.price * difference &&
      (!product.stock || newQuantity <= product.stock)
    ) {
      setQuantity(newQuantity);
      onBuy(product, difference);
    } else if (difference < 0 && newQuantity >= 0) {
      setQuantity(newQuantity);
      onSell(product, -difference);
    }
  };

  return (
    <div className="product-item">
      <img src={`/images/${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString()}</p>
      <button
        className="buy"
        onClick={handleBuy}
        disabled={
          balance < product.price * (parseInt(inputQuantity, 10) || 1) ||
          (product.stock && quantity >= product.stock)
        }
      >
        Buy
      </button>
      <input
        className="quantity"
        type="text"
        value={quantity}
        onChange={handleQuantityChange}
        placeholder="Quantity"
      />
      <button className="sell" onClick={handleSell} disabled={quantity === 0}>
        Sell
      </button>
    </div>
  );
};

export default ProductItem;
