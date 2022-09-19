import React, { useEffect, useState } from 'react';
import './daily.css';
import { iconSelection } from '../helpers';

const Daily = ({ currentData }) => {
  const { weather, loading } = currentData;
  const [date, setDate] = useState([]);
  const [temp, setTemp] = useState([]);
  const [icons, setIcons] = useState([]);
  const loaded = Boolean(loading === false && weather.hourly);

  useEffect(() => {
    if (weather.daily) {
      let temps = weather.daily.map((day) => {
        let high = Math.round(day.temp.max);
        let low = Math.round(day.temp.min);
        return `${low}°F / ${high}°F`;
      });
      let iconIds = weather.daily.map((day) => {
        return day.weather[0].id;
      });
      let dates = weather.daily.map((hour) => {
        let todaysDate = new Date(hour.dt * 1000);
        return `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
      });
      setDate(dates);
      setTemp(temps);
      setIcons(iconIds);
    }
  }, [currentData]);

  return (
    <div className="daily">
      {loaded && (
        <div className="daily-container">
          {date.map((day, index) => {
            return (
              <div
                className={`daily-day ${
                  index >= date.length - 1 ? '' : 'border-bottom'
                }`}
                key={index}
              >
                <div className="daily-date">{day}</div>
                <div className="daily-temp">{temp[index]}</div>
                <div className="daily-icon">
                  <img src={iconSelection(icons[index])} alt="weather icon" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Daily;
