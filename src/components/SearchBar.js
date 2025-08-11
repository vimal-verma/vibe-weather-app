import React, { useState } from 'react';

function SearchBar({ onSearch, onGeolocate }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onSearch(location);
    }
  };

  return (
    <div className="search-controls">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <button onClick={onGeolocate} className="geolocate-button" title="Use my location">
        📍
      </button>
    </div>
  );
}

export default SearchBar;