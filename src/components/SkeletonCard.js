import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="weather-card">
      <div className="skeleton skeleton-title" />
      <div className="weather-main">
        <div className="skeleton skeleton-icon-main" />
        <div className="skeleton skeleton-temp" />
      </div>
      <div className="skeleton skeleton-text" />
      <div className="weather-details-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="detail-item-card skeleton-item-card">
            <div className="skeleton skeleton-icon-small" />
            <div className="skeleton skeleton-text-small" />
            <div className="skeleton skeleton-text-small" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonCard;