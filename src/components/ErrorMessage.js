import React from 'react';
import './ErrorMessage.css';
import { WiCloudyGusts } from 'react-icons/wi';

const ErrorMessage = ({ message }) => (
  <div className="error-message-container">
    <WiCloudyGusts className="error-icon" />
    <h3 className="error-title">Oops! Something went wrong.</h3>
    <p className="error-text-detail">{message}</p>
    <p className="error-suggestion">Please check the city name or try again later.</p>
  </div>
);

export default ErrorMessage;