import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeolocate = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (err) => {
          setError("Unable to retrieve location. Please grant permission or search manually.");
          console.error(err);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Fetch weather for user's location on initial load
    handleGeolocate();
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchWeather = async (location) => {
    if (!location) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.error.message);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <SearchBar onSearch={fetchWeather} onGeolocate={handleGeolocate} />
      </header>
      <main>
        {loading && <p className="info-text">Loading...</p>}
        {error && <p className="error-text">Error: {error}</p>}
        {!loading && !error && !weatherData && (
          <p className="info-text">
            Use the search bar or allow location access to see the weather.
          </p>
        )}
        {weatherData && (
          <div className="weather-container">
            <WeatherCard data={weatherData} />
            <Forecast data={weatherData.forecast.forecastday} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
