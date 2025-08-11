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
    // eslint-disable-next-line
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

  const getWeatherBackgroundClass = (conditionText) => {
    if (!conditionText) return 'bg-default';
    const condition = conditionText.toLowerCase();
    if (condition.includes('sun') || condition.includes('clear')) return 'bg-sunny';
    if (condition.includes('rain')) return 'bg-rainy';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'bg-cloudy';
    if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) return 'bg-snowy';
    if (condition.includes('mist') || condition.includes('fog')) return 'bg-misty';
    if (condition.includes('thunder')) return 'bg-thunder';
    return 'bg-default';
  };

  const backgroundClass = weatherData ? getWeatherBackgroundClass(weatherData.current.condition.text) : 'bg-default';

  return (
    <div className={`App ${backgroundClass}`}>
      <header className="App-header">
        <a href="/" className="header-logo-link">
        <div className="header-title-container">
          <img src="/icon.jpg" alt="Weather App Logo" className="app-logo" />
          <h1>Weather App</h1>
          <p>By Vimal</p>
        </div>
        </a>
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
      <footer className="app-footer">
        <p>Made with ❤️ by Vimal &copy; {new Date().getFullYear()} Vibe Weather. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
