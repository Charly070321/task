// src/BuyAirtime.js
import React, { useState } from 'react';
import './Form.css';
import { airtimeTopup } from '../api';
import mtn from '../assets/img/mtn.jpeg';
import mobile from '../assets/img/9mobile.jpeg';
import glo from '../assets/img/glo.jpeg';
import airtel from '../assets/img/airtel.jpeg';

const BuyAirtime = ({ addToCart, navigateToCart }) => {
  const [selectedProvider, setSelectedProvider] = useState('Airtel');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topupData = {
      msisdn: phoneNumber,
      amount: parseFloat(amount),
      provider: selectedProvider,
      reference: `ref_${Date.now()}`,
    };
    try {
      const response = await airtimeTopup(topupData);
      console.log('Airtime top-up response:', response); // Log the response to inspect in the console
      addToCart({
        type: 'Airtime',
        provider: selectedProvider,
        msisdn: phoneNumber,
        amount,
      });
      alert('Airtime top-up successful!');
      navigateToCart();
    } catch (error) {
      console.error('Airtime top-up failed', error.response ? error.response.data : error.message);
      alert('Airtime top-up failed! Check console for details.');
    }
  };

  return (
    <div className="form-container">
      <h2>Buy airtime</h2>
      <p>Please enter your details.</p>
      <div className="providers">
        {['MTN', 'Airtel', '9mobile', 'Glo'].map((provider) => (
          <div
            key={provider}
            className={`provider ${selectedProvider === provider ? 'selected' : ''}`}
            onClick={() => setSelectedProvider(provider)}
          >
            {provider === 'MTN' && <img src={mtn} alt="MTN" />}
            {provider === '9mobile' && <img src={mobile} alt="9mobile" />}
            {provider === 'Glo' && <img src={glo} alt="Glo" />}
            {provider === 'Airtel' && <img src={airtel} alt="Airtel" />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          className="input-field"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          className="input-field"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="buttons">
          <button type="submit" className="button add-to-cart">Add to cart</button>
          <button type="button" className="button proceed-to-checkout" onClick={navigateToCart}>Proceed to checkout</button>
        </div>
      </form>
    </div>
  );
};

export default BuyAirtime;
