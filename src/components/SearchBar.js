import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const AUTOCOMPLETE_URL = 'https://api.weatherapi.com/v1/search.json';

const metroCities = ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Ahmedabad','Jaipur', 'Patna', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'];

function SearchBar({ onSearch, onGeolocate }) {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(true);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`${AUTOCOMPLETE_URL}?key=${API_KEY}&q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (location && isSuggestionsVisible) {
        fetchSuggestions(location);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [location, fetchSuggestions, isSuggestionsVisible]);

  const handleSuggestionClick = (selectedLocation) => {
    setLocation(selectedLocation);
    setSuggestions([]);
    setIsSuggestionsVisible(false);
    onSearch(selectedLocation);
  };

  const handleCityClick = (selectedLocation) => {
    setLocation(selectedLocation);
    onSearch(selectedLocation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      onSearch(location);
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
    if (!isSuggestionsVisible) {
      setIsSuggestionsVisible(true);
    }
  }

  return (
    <>
      <div className="search-controls">
        <div className="search-bar-container">
          <form onSubmit={handleSubmit} className="search-bar" autoComplete="off">
            <input
              type="text"
              value={location}
              onChange={handleInputChange}
              placeholder="Enter city name..."
              className="search-input"
            />
            <button type="submit" className="search-button" aria-label="Search"><FaSearch /></button>
          </form>
          {suggestions.length > 0 && isSuggestionsVisible && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}, {suggestion.region && `${suggestion.region}, `}{suggestion.country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onGeolocate} className="geolocate-button" title="Use my location">
          <MdMyLocation />
        </button>
      </div>
      <div className="metro-cities-container">
        {metroCities.map(city => (
          <button key={city} onClick={() => handleCityClick(city)} className="metro-city-button">
            {city}
          </button>
        ))}
      </div>
    </>
  );
}

export default SearchBar;