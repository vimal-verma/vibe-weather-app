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

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const { location, current } = data;
  const aqiIndex = current.air_quality ? current.air_quality['us-epa-index'] : null;
  const aqiInfo = aqiIndex ? getAqiInfo(aqiIndex) : { level: 'N/A', className: 'aqi-unknown' };
  
  const temp = unit === 'c' ? Math.round(current.temp_c) : Math.round(current.temp_f);
  const tempUnit = unit === 'c' ? '°C' : '°F';
  const windSpeed = unit === 'c' ? `${current.wind_kph} kph` : `${current.wind_mph} mph`;
  const visibility = unit === 'c' ? `${current.vis_km} km` : `${current.vis_miles} miles`;

  const details = [
    { Icon: WiHumidity, label: 'Humidity', value: `${current.humidity}%` },
    { Icon: WiStrongWind, label: 'Wind Speed', value: windSpeed },
    { Icon: WiBarometer, label: 'Pressure', value: `${current.pressure_mb} mb` },
    { Icon: MdVisibility, label: 'Visibility', value: visibility },
    { Icon: WiDaySunny, label: 'UV Index', value: current.uv },
    { Icon: WiCloudy, label: 'Cloud Cover', value: `${current.cloud}%` },
  ];

  return (
    <div className="weather-card">
      <h2>{location.name}, {location.country}</h2>
      <div className="weather-main">
        <img src={current.condition.icon} alt={current.condition.text} />
        <p className="temperature">{temp}{tempUnit}</p>
      </div>
      <p className="condition">{current.condition.text}</p>
      <div className="weather-details-grid">
        {details.map(({ Icon, label, value }) => (
          <div key={label} className="detail-item-card">
            <Icon className="detail-icon" />
            <p className="detail-label">{label}</p>
            <p className="detail-value">{value}</p>
          </div>
        ))}
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

export default WeatherCard