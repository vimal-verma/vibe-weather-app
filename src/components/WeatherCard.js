import React from 'react';

const getAqiInfo = (aqi) => {
  if (aqi === 1) return { level: 'Good', className: 'aqi-good' };
  if (aqi === 2) return { level: 'Moderate', className: 'aqi-moderate' };
  if (aqi === 3) return { level: 'Unhealthy for sensitive groups', className: 'aqi-unhealthy-sensitive' };
  if (aqi === 4) return { level: 'Unhealthy', className: 'aqi-unhealthy' };
  if (aqi === 5) return { level: 'Very Unhealthy', className: 'aqi-very-unhealthy' };
  if (aqi === 6) return { level: 'Hazardous', className: 'aqi-hazardous' };
  return { level: 'Unknown', className: 'aqi-unknown' };
};

function WeatherCard({ data }) {
  if (!data) return null;

  const { location, current } = data;
  const aqiIndex = current.air_quality ? current.air_quality['us-epa-index'] : null;
  const aqiInfo = aqiIndex ? getAqiInfo(aqiIndex) : { level: 'N/A', className: 'aqi-unknown' };
  
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
        <p>Pressure: {current.pressure_mb} mb</p>
        <p>Visibility: {current.vis_km} km</p>
        <p>UV Index: {current.uv}</p>
        <p>Cloud Cover: {current.cloud}%</p>
        <p>Precipitation: {current.precip_mm} mm</p>
        <p>Last updated: {new Date(current.last_updated).toLocaleTimeString()}</p>
      </div>
      {current.air_quality && (
        <div className="air-quality">
          <h4>Air Quality</h4>
          <div className={`aqi-level ${aqiInfo.className}`}>
            <span className="aqi-text">{aqiInfo.level}</span>
            <span className="aqi-value">({aqiIndex} US EPA)</span>
          </div>
          <div className="pollutant-grid">
            <div className="pollutant-item">
              <span className="pollutant-name">CO</span>
              <span className="pollutant-value">{Math.round(current.air_quality.co)} µg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">O₃</span>
              <span className="pollutant-value">{Math.round(current.air_quality.o3)} µg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">NO₂</span>
              <span className="pollutant-value">{Math.round(current.air_quality.no2)} µg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">SO₂</span>
              <span className="pollutant-value">{Math.round(current.air_quality.so2)} µg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">PM2.5</span>
              <span className="pollutant-value">{Math.round(current.air_quality.pm2_5)} µg/m³</span>
            </div>
            <div className="pollutant-item">
              <span className="pollutant-name">PM10</span>
              <span className="pollutant-value">{Math.round(current.air_quality.pm10)} µg/m³</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;