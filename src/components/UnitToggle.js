import React from 'react';
import './UnitToggle.css';

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-button ${unit === 'c' ? 'active' : ''}`}
        onClick={() => onToggle('c')}
        aria-pressed={unit === 'c'}
      >
        °C
      </button>
      <button
        className={`unit-button ${unit === 'f' ? 'active' : ''}`}
        onClick={() => onToggle('f')}
        aria-pressed={unit === 'f'}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;