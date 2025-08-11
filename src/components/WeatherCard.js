import React from 'react';

function WeatherCard({ data }) {
  if (!data) return null;

  const { location, current } = data;

  return (
    <div className="weather-card">
      <h2>{location.name}, {location.country}</h2>
      <div className="weather-main">
        <img src={current.condition.icon} alt={current.condition.text} />
        <p className="temperature">{Math.round(current.temp_c)}°C</p>
      </div>
      <p className="condition">{current.condition.text}</p>
      <div className="weather-details">
        <p>Feels like: {Math.round(current.feelslike_c)}°C</p>
        <p>Humidity: {current.humidity}%</p>
        <p>Wind: {current.wind_kph} kph</p>
      </div>
    </div>
  );
}

export default WeatherCard;