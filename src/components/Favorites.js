import React from 'react';
import { FaTimes, FaStar } from 'react-icons/fa';
import './Favorites.css';

function Favorites({ favorites, onSelect, onRemove }) {
  return (
    <div className="favorites-container">
      <h4 className="favorites-title">
        <FaStar /> Your Favorites
      </h4>
      {(!favorites || favorites.length === 0) ? (
        <p className="no-favorites-message">Add a city to your favorites using the star icon.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((city) => (
            <div key={city} className="favorite-item">
              <button className="favorite-city-button" onClick={() => onSelect(city)}>
                {city}
              </button>
              <button className="favorite-remove-button" onClick={() => onRemove(city)} title={`Remove ${city}`} aria-label={`Remove ${city} from favorites`}>
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;