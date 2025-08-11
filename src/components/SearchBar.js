import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onSearch(location);
    }
  };

  return (
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
  );
}

export default SearchBar;