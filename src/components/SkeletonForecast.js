import React from 'react';

const SkeletonForecast = () => {
  return (
    <div className="forecast-container">
      <div className="skeleton skeleton-title" />
      <div className="forecast-list">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="forecast-day-item skeleton-item-card">
            <div className="forecast-summary">
              <div className="forecast-summary-date">
                <div className="skeleton skeleton-text" style={{ width: '100px', height: '1.2em' }} />
                <div className="skeleton skeleton-text" style={{ width: '70px', height: '1em', marginTop: '0.25rem' }} />
              </div>
              <div className="forecast-summary-temp">
                <div className="skeleton skeleton-icon-small" />
                <div className="skeleton skeleton-text" style={{ width: '80px' }} />
              </div>
              <div className="skeleton skeleton-text" style={{ width: '120px' }} />
              <div className="skeleton skeleton-text" style={{ width: '20px', justifySelf: 'end' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonForecast;