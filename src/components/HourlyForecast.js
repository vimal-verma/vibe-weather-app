import React from 'react';
import './HourlyForecast.css';

function HourlyForecast({ hourlyData, unit }) {
  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <div className="hourly-forecast-container">
      <div className="hourly-forecast-scroll">
        {hourlyData.map((hour) => {
          const temp = unit === 'c' ? Math.round(hour.temp_c) : Math.round(hour.temp_f);
          const time = new Date(hour.time_epoch * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
          });

          return (
            <div key={hour.time_epoch} className="hourly-item">
              <p className="hourly-time">{time}</p>
              <img src={hour.condition.icon} alt={hour.condition.text} className="hourly-icon" title={hour.condition.text} />
              <p className="hourly-temp">{temp}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;