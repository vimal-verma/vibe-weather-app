import React, { useState } from 'react';
import {
  WiStrongWind,
  WiHumidity,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiSunrise,
  WiSunset,
  WiRaindrops,
  WiMoonrise,
  WiMoonset,
  WiNightClear,
} from 'react-icons/wi';

function Forecast({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!data) return null;

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="forecast-container">
      <h3>10-Day Forecast</h3>
      <div className="forecast-list">
        {data.map((day, index) => (
          <div key={day.date_epoch} className="forecast-day-item">
            <button className="forecast-summary" onClick={() => handleToggle(index)}>
              <div className="forecast-summary-date">
                <p className="day-name">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p className="short-date">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div className="forecast-summary-temp">
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <span>{Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°</span>
              </div>
              <p className="forecast-summary-condition">{day.day.condition.text}</p>
              <span className={`forecast-toggle-icon ${expandedIndex === index ? 'expanded' : ''}`}>
                ▼
              </span>
            </button>
            {expandedIndex === index && (
              <div className="forecast-details-expanded">
                <div className="detail-item">
                  <WiStrongWind />
                  <p>Max Wind</p>
                  <p>{day.day.maxwind_kph} kph</p>
                </div>
                <div className="detail-item">
                  <WiHumidity />
                  <p>Avg Humidity</p>
                  <p>{day.day.avghumidity}%</p>
                </div>
                <div className="detail-item">
                  <WiDaySunny />
                  <p>UV Index</p>
                  <p>{day.day.uv}</p>
                </div>
                <div className="detail-item">
                  <WiRain />
                  <p>Rain Chance</p>
                  <p>{day.day.daily_chance_of_rain}%</p>
                </div>
                <div className="detail-item">
                  <WiSnow />
                  <p>Snow Chance</p>
                  <p>{day.day.daily_chance_of_snow}%</p>
                </div>
                <div className="detail-item">
                  <WiSunrise />
                  <p>Sunrise</p>
                  <p>{day.astro.sunrise}</p>
                </div>
                <div className="detail-item">
                  <WiSunset />
                  <p>Sunset</p>
                  <p>{day.astro.sunset}</p>
                </div>
                <div className="detail-item">
                  <WiRaindrops />
                  <p>Precipitation</p>
                  <p>{day.day.totalprecip_mm} mm</p>
                </div>
                <div className="detail-item">
                  <WiMoonrise />
                  <p>Moonrise</p>
                  <p>{day.astro.moonrise}</p>
                </div>
                <div className="detail-item">
                  <WiMoonset />
                  <p>Moonset</p>
                  <p>{day.astro.moonset}</p>
                </div>
                <div className="detail-item">
                  <WiNightClear />
                  <p>Moon Phase</p>
                  <p>{day.astro.moon_phase}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;