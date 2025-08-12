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
import { FaChevronDown } from 'react-icons/fa';
import HourlyForecast from './HourlyForecast';

function Forecast({ data, unit }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!data) return null;

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getForecastDetails = (day) => {
    const windSpeed = unit === 'c' ? `${day.day.maxwind_kph} kph` : `${Number(day.day.maxwind_mph).toFixed(1)} mph`;
    const precip = unit === 'c' ? `${day.day.totalprecip_mm} mm` : `${Number(day.day.totalprecip_in).toFixed(2)} in`;

    return [
      { Icon: WiStrongWind, label: 'Max Wind', value: windSpeed },
      { Icon: WiHumidity, label: 'Avg Humidity', value: `${day.day.avghumidity}%` },
      { Icon: WiDaySunny, label: 'UV Index', value: day.day.uv },
      { Icon: WiRain, label: 'Rain Chance', value: `${day.day.daily_chance_of_rain}%` },
      { Icon: WiSnow, label: 'Snow Chance', value: `${day.day.daily_chance_of_snow}%` },
      { Icon: WiRaindrops, label: 'Precipitation', value: precip },
      { Icon: WiSunrise, label: 'Sunrise', value: day.astro.sunrise },
      { Icon: WiSunset, label: 'Sunset', value: day.astro.sunset },
      { Icon: WiMoonrise, label: 'Moonrise', value: day.astro.moonrise },
      { Icon: WiMoonset, label: 'Moonset', value: day.astro.moonset },
      { Icon: WiNightClear, label: 'Moon Phase', value: day.astro.moon_phase },
    ];
  };

  return (
    <div className="forecast-container">
      <h3>10-Day Forecast</h3>
      <div className="forecast-list">
        {data.map((day, index) => {
          const isExpanded = expandedIndex === index;
          const maxTemp = unit === 'c' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f);
          const minTemp = unit === 'c' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f);

          return (
            <div key={day.date_epoch} className="forecast-day-item">
            <button
              className="forecast-summary"
              onClick={() => handleToggle(index)}
              aria-expanded={isExpanded}
              aria-controls={`forecast-details-${index}`}
            >
              <div className="forecast-summary-date">
                <p className="day-name">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p className="short-date">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </div>
              <div className="forecast-summary-temp">
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <span>{maxTemp}° / {minTemp}°</span>
              </div>
              <p className="forecast-summary-condition">{day.day.condition.text}</p>
              <span className={`forecast-toggle-icon ${isExpanded ? 'expanded' : ''}`}>
                <FaChevronDown />
              </span>
            </button>
            {isExpanded && (
              <div className="forecast-expanded-content" id={`forecast-details-${index}`}>
                <div className="forecast-details-expanded">
                  {getForecastDetails(day).map(({ Icon, label, value }) => (
                    <div key={label} className="detail-item">
                      <Icon />
                      <p>{label}</p>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
                <HourlyForecast hourlyData={day.hour} unit={unit} />
              </div>
            )}
          </div>
        )})}
      </div>
    </div>
  );
}

export default Forecast;