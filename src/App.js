import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import SkeletonCard from './components/SkeletonCard';
import SkeletonForecast from './components/SkeletonForecast';
import WeatherAlerts from './components/WeatherAlerts';
import Favorites from './components/Favorites';
import UnitToggle from './components/UnitToggle';
import { getWeatherBackgroundClass } from './utils/weatherUtils';
import './App.css';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(() => localStorage.getItem('unitPreference') || 'c');
  const [favorites, setFavorites] = useState([]);

  const handleUnitToggle = (selectedUnit) => {
    setUnit(selectedUnit === 'c' ? 'f' : 'c');
  };

  const toggleFavorite = (cityName) => {
    const updatedFavorites = favorites.includes(cityName)
      ? favorites.filter((fav) => fav !== cityName)
      : [...favorites, cityName];

    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchWeather = useCallback(async (location) => {
    if (!location) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `${API_URL}?key=${API_KEY}&q=${location}&days=10&aqi=yes&alerts=yes`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        localStorage.setItem('lastSearchedCity', data.location.name);
        console.log('Weather data fetched successfully:', data);
      } else {
        setError(data.error.message);
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGeolocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        (err) => {
          setError(
            'Location access denied. Please search for a city manually.'
          );
          console.error(err);
          setLoading(false); // Stop loading if location is denied
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [fetchWeather]);

  // Save unit preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('unitPreference', unit);
  }, [unit]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      fetchWeather(lastCity);
    } else {
      handleGeolocate();
    }
  }, [fetchWeather, handleGeolocate]);

  const backgroundClass = weatherData ? getWeatherBackgroundClass(weatherData.current.condition.text) : 'bg-default';

  return (
    <div className={`App ${backgroundClass}`}>
      <header className="App-header">
        <div className="header-title-container">
          <img src="/icon.jpg" alt="Weather App Logo" className="app-logo" />
          <h1>Vibe Weather</h1>
        </div>
        <div className="header-controls">
          <UnitToggle unit={unit} onToggle={handleUnitToggle} />
          <img src="https://img.shields.io/github/stars/vimal-verma/vibe-weather-app??style=flat" alt="Weather App Logo" className="github-badge" onClick={() => window.open('https://github.com/vimal-verma/vibe-weather-app', '_blank')}/>
        </div>
        <SearchBar onSearch={fetchWeather} onGeolocate={handleGeolocate} />
        <Favorites
          favorites={favorites}
          onSelect={fetchWeather}
          onRemove={toggleFavorite}
        />
      </header>
      <main>
        {loading && (
          <div className="weather-container">
            <SkeletonCard />
            <SkeletonForecast />
          </div>
        )}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && !weatherData && (
          <div className="info-container">
            <p>Welcome! Search for a city or use geolocation to get the latest weather forecast.</p>
          </div>
        )}
        {weatherData && (
          <div className="weather-container">
            <WeatherAlerts alerts={weatherData.alerts.alert} />
            <WeatherCard data={weatherData} unit={unit} onToggleFavorite={toggleFavorite} favorites={favorites} />
            <Forecast data={weatherData.forecast.forecastday} unit={unit} />
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>Made with ❤️ by Vimal &copy; {new Date().getFullYear()} Vibe Weather</p>
      </footer>
    </div>
  );
}

export default App;
