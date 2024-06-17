// src/cart/Cart.js

import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, proceedToCheckout }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                <p>{item.type} - {item.provider}</p>
                <p>Phone Number: {item.msisdn}</p>
                <p>Amount/Plan: {item.amount || item.plan}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="checkout-button" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
