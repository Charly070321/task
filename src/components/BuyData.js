// src/BuyData.js
import React, { useState } from 'react';
import './Form.css';
import { dataTopup } from '../api';
import airtel from '../assets/img/airtel.jpeg';
import mtn from '../assets/img/mtn.jpeg';
import glo from '../assets/img/glo.jpeg';
import mobile from '../assets/img/9mobile.jpeg';

const BuyData = ({ addToCart }) => {
  const [selectedProvider, setSelectedProvider] = useState('Airtel');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [plan, setPlan] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topupData = {
      product_id: 'D-MFIN-6-250MB', 
      denomination: parseFloat(plan),
      send_sms: false,
      sms_text: '',
      customer_reference: `ref_${Date.now()}`,
    };
    try {
      const response = await dataTopup(topupData);
      console.log(response);
      addToCart({
        type: 'Data',
        provider: selectedProvider,
        msisdn: phoneNumber,
        plan,
      });
      alert('Data top-up successful!');
    } catch (error) {
      console.error('Data top-up failed', error);
      alert('Data top-up failed!');
    }
  };

  return (
    <div className="form-container">
      <h2>Buy data</h2>
      <p>Please enter your details.</p>
      <div className="providers">
        {['MTN', 'Airtel', '9mobile', 'Glo'].map((provider) => (
          <div
            key={provider}
            className={`provider ${selectedProvider === provider ? 'selected' : ''}`}
            onClick={() => setSelectedProvider(provider)}
          >
            {provider === 'Airtel' && <img src={airtel} alt="" />}
            {provider === 'MTN' && <img src={mtn} alt="" />}
            {provider === 'Glo' && <img src={glo} alt="" />}
            {provider === '9mobile' && <img src={mobile} alt="" />}
            {/* <span>{provider}</span> */}
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
          placeholder="Data Plan"
          className="input-field"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
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
          <button className="button proceed-to-checkout">Proceed to checkout</button>
        </div>
      </form>
    </div>
  );
};

export default BuyData;
