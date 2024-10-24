import React from 'react';
import './ShoppingCart.style.css';

const ShoppingCart = ({ cartItems }) => {
  // calculate total price in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.total, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {/* if no items in the cart, show message */}
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} x {item.quantity} = ${item.total.toLocaleString()}</p>
            </div>
          ))}
          {/* show total price*/}
          <div className="total-price">
            <hr />
            <h3>Total: ${totalPrice.toLocaleString()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
