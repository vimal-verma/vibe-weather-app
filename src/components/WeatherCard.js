import React from 'react';
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiCloudy,
  WiDaySunny,
} from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { getAqiInfo } from '../utils/weatherUtils';

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
      <div className="weather-details-grid">
        <div className="detail-item-card">
          <WiHumidity className="detail-icon" />
          <p className="detail-label">Humidity</p>
          <p className="detail-value">{current.humidity}%</p>
        </div>
        <div className="detail-item-card">
          <WiStrongWind className="detail-icon" />
          <p className="detail-label">Wind Speed</p>
          <p className="detail-value">{current.wind_kph} kph</p>
        </div>
        <div className="detail-item-card">
          <WiBarometer className="detail-icon" />
          <p className="detail-label">Pressure</p>
          <p className="detail-value">{current.pressure_mb} mb</p>
        </div>
        <div className="detail-item-card">
          <MdVisibility className="detail-icon" />
          <p className="detail-label">Visibility</p>
          <p className="detail-value">{current.vis_km} km</p>
        </div>
        <div className="detail-item-card">
          <WiDaySunny className="detail-icon" />
          <p className="detail-label">UV Index</p>
          <p className="detail-value">{current.uv}</p>
        </div>
        <div className="detail-item-card">
          <WiCloudy className="detail-icon" />
          <p className="detail-label">Cloud Cover</p>
          <p className="detail-value">{current.cloud}%</p>
        </div>
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