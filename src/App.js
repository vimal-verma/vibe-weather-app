import React, { useState } from 'react';
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

  const fetchWeather = async (location) => {
    if (!location) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`);
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
        <h1>Vibe Weather</h1>
        <SearchBar onSearch={fetchWeather} />
      </header>
      <main>
        {loading && <p className="info-text">Loading...</p>}
        {error && <p className="error-text">Error: {error}</p>}
        {!loading && !error && !weatherData && (
          <p className="info-text">Enter a city to get the weather forecast.</p>
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
