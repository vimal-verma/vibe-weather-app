export const getWeatherBackgroundClass = (conditionText) => {
    if (!conditionText) return 'bg-default';
    const condition = conditionText.toLowerCase();
    if (condition.includes('sun') || condition.includes('clear')) return 'bg-sunny';
    if (condition.includes('rain')) return 'bg-rainy';
    if (condition.includes('cloud') || condition.includes('overcast')) return 'bg-cloudy';
    if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) return 'bg-snowy';
    if (condition.includes('mist') || condition.includes('fog')) return 'bg-misty';
    if (condition.includes('thunder')) return 'bg-thunder';
    return 'bg-default';
};

export const getAqiInfo = (aqi) => {
    if (aqi === 1) return { level: 'Good', className: 'aqi-good' };
    if (aqi === 2) return { level: 'Moderate', className: 'aqi-moderate' };
    if (aqi === 3) return { level: 'Unhealthy for sensitive groups', className: 'aqi-unhealthy-sensitive' };
    if (aqi === 4) return { level: 'Unhealthy', className: 'aqi-unhealthy' };
    if (aqi === 5) return { level: 'Very Unhealthy', className: 'aqi-very-unhealthy' };
    if (aqi === 6) return { level: 'Hazardous', className: 'aqi-hazardous' };
    return { level: 'Unknown', className: 'aqi-unknown' };
};