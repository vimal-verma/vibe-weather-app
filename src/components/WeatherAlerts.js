import React, { useState } from 'react';
import { MdWarning } from 'react-icons/md';
import './WeatherAlerts.css';

function WeatherAlerts({ alerts }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!alerts || alerts.length === 0) {
    return null;
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedAlerts = isExpanded ? alerts : alerts.slice(0, 1);

  return (
    <div className="alerts-container">
      {displayedAlerts.map((alert, index) => (
        <div key={index} className={`alert-item alert-severity-${alert.severity.toLowerCase().replace(' ', '-')}`}>
          <div className="alert-header">
            <MdWarning className="alert-icon" />
            <h4 className="alert-headline">{alert.headline}</h4>
          </div>
          <p className="alert-event"><strong>Event:</strong> {alert.event}</p>
          <p className="alert-effective"><strong>Effective:</strong> {new Date(alert.effective).toLocaleString()}</p>
          <p className="alert-description">{alert.desc}</p>
        </div>
      ))}
      {alerts.length > 1 && (
        <button onClick={toggleExpand} className="alert-toggle-button">
          {isExpanded ? 'Show Less' : `Show ${alerts.length - 1} more alert(s)`}
        </button>
      )}
    </div>
  );
}

export default WeatherAlerts;