// src/Main.js

import React, { useState, useEffect } from 'react';
import BuyAirtime from './BuyAirtime';
import BuyData from './BuyData';
import Cart from './cart/Cart';
import './Main.css';
import Utilities from './utility/Utilities';
import { authenticate } from '../api';

const Main = () => {
  const [activeTab, setActiveTab] = useState('airtime');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    authenticate();
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const navigateToCart = () => {
    setActiveTab('cart');
  };

  const renderContent = () => {
    if (activeTab === 'airtime') {
      return <BuyAirtime addToCart={addToCart} navigateToCart={navigateToCart} />;
    }
    if (activeTab === 'data') {
      return <BuyData addToCart={addToCart} navigateToCart={navigateToCart} />;
    }
    if (activeTab === 'utilities') {
      return <Utilities addToCart={addToCart} />;
    }
    if (activeTab === 'cart') {
      return <Cart cartItems={cartItems} removeFromCart={removeFromCart} />;
    }
  };

  return (
    <div className="main-container">
      <h2>Pay bills with ease</h2>
      <p>Enjoy the convenience of paying bills with ease.</p>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'airtime' ? 'active' : ''}`}
          onClick={() => setActiveTab('airtime')}
        >
          Buy airtime
        </button>
        <button
          className={`tab ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          Buy data
        </button>
        <button
          className={`tab ${activeTab === 'utilities' ? 'active' : ''}`}
          onClick={() => setActiveTab('utilities')}
        >
          Utilities
        </button>
        <button
          className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          Cart
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Main;
