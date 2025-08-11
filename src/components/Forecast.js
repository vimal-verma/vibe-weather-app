import React, { useState } from 'react';

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
                  <span>Max Wind</span>
                  <span>{day.day.maxwind_kph} kph</span>
                </div>
                <div className="detail-item">
                  <span>Avg Humidity</span>
                  <span>{day.day.avghumidity}%</span>
                </div>
                <div className="detail-item">
                  <span>UV Index</span>
                  <span>{day.day.uv}</span>
                </div>
                <div className="detail-item">
                  <span>Chance of Rain</span>
                  <span>{day.day.daily_chance_of_rain}%</span>
                </div>
                <div className="detail-item">
                  <span>Chance of Snow</span>
                  <span>{day.day.daily_chance_of_snow}%</span>
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