import React from 'react';

function Forecast({ data }) {
  if (!data) return null;

  return (
    <div className="forecast-container">
      <h3>3-Day Forecast</h3>
      <div className="forecast-days">
        {data.map((day) => (
          <div key={day.date_epoch} className="forecast-day">
            <p className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p className="forecast-temp">
              {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;