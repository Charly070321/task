import React from 'react';
import './utility.css';

const Utilities = () => {
  return (
    <div className="utilities-container">
      <h2>Pay for Utility</h2>
      <p>Please enter your details.</p>
      <div className="utility-steps">
        <div className="step">1</div>
        <div className="step">2</div>
        <div className="step">3</div>
      </div>
      <div className="utility-form">
        <select className="utility-select">
          <option>Select category</option>
        </select>
        <select className="utility-select">
          <option>Select biller</option>
        </select>
        <div className="utility-buttons">
          <button className="utility-button back">Back</button>
          <button className="utility-button proceed">Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default Utilities;
