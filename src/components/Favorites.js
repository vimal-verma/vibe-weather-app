import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './Favorites.css';

function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <div className="favorites-container">
      <h4 className="favorites-title">Favorites:</h4>
      <div className="favorites-list">
        {favorites.map((city) => (
          <div key={city} className="favorite-item">
            <button className="favorite-city-button" onClick={() => onSelect(city)}>
              {city}
            </button>
            <button className="favorite-remove-button" onClick={() => onRemove(city)} title={`Remove ${city}`}>
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;