import React, { useEffect, useState } from 'react';
import './daily.css';

const Daily = ({ currentData }) => {
  const { weather, loading } = currentData;
  const [date, setDate] = useState([]);
  const [temp, setTemp] = useState([]);
  const [description, setDescription] = useState([]);
  const loaded = Boolean(loading === false && weather.hourly);

  useEffect(() => {
    if (weather.daily) {
      let temps = weather.daily.map((day) => {
        let high = Math.round(day.temp.max);
        let low = Math.round(day.temp.min);
        return `${low}°F / ${high}°F`;
      });
      let descriptions = weather.daily.map((day) => {
        return (
          day.weather[0].description.charAt(0).toUpperCase() +
          day.weather[0].description.slice(1)
        );
      });
      let dates = weather.daily.map((hour) => {
        let todaysDate = new Date(hour.dt * 1000);
        return `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
      });
      setDate(dates);
      setTemp(temps);
      setDescription(descriptions);
    }
  }, [currentData]);

  return (
    <div className="daily">
      {loaded && (
        <div className="daily-container">
          {date.map((day, index) => {
            return (
              <div className="daily-day" key={index}>
                <div className="daily-date">{day}</div>
                <div className="daily-temp">{temp[index]}</div>
                <div className="daily-desc">{description[index]}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Daily;
