import React, { useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import { useBalance } from "./hooks/useBalange";
import { products } from "./data/products";
import "./App.css";

const App = () => {
  const { balance, updateBalance } = useBalance(219000000000); // use the custom hook to manage the balance
  const [cartItems, setCartItems] = useState([]); // track of items in the cart

  // function to handle the buy action
  const handleBuy = (product, quantity) => {
    if (balance >= product.price * quantity) {
      updateBalance(-product.price * quantity);
      const item = cartItems.find((item) => item.id === product.id);
      if (item) {
        item.quantity += quantity;
        item.total += product.price * quantity;
      } else {
        setCartItems([
          ...cartItems,
          { ...product, quantity, total: product.price * quantity },
        ]);
      }
    }
  };

  // function to handle the sell action
  const handleSell = (product, quantity) => {
    const item = cartItems.find((item) => item.id === product.id);
    if (item && item.quantity >= quantity) {
      updateBalance(product.price * quantity);
      item.quantity -= quantity;
      item.total -= product.price * quantity;
      if (item.quantity === 0) {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
      }
    }
  };

  return (
    <div className="app">
      <Header balance={balance} />
      <ProductList
        products={products}
        balance={balance}
        onBuy={handleBuy}
        onSell={handleSell}
      />
      <ShoppingCart cartItems={cartItems} />
    </div>
  );
};

export default App;
