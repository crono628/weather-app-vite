import React, { useEffect, useState } from 'react';
import './current.css';
import { minutesDisplay, hourDisplay } from '../helpers';

const Current = ({ currentData }) => {
  const { weather, loading, choice } = currentData;
  const loaded = Boolean(loading === false && weather.current);

  const [date, setDate] = useState('');
  const [sun, setSun] = useState({});

  useEffect(() => {
    if (weather.current) {
      console.log('weather', weather);
      let todaysDate = new Date(weather.current.dt * 1000);
      let sunrise = new Date(weather.current.sunrise * 1000);
      let sunset = new Date(weather.current.sunset * 1000);
      let timezoneOffset = (weather.timezone_offset / 60 / 60) * -1;
      setDate(
        `${
          todaysDate.getMonth() + 1
        }/${todaysDate.getDate()}/${todaysDate.getFullYear()}`
      );
      setSun({
        rise: `${hourDisplay(sunrise, timezoneOffset)}:${minutesDisplay(
          sunrise
        )}`,
        set: `${hourDisplay(sunset, timezoneOffset)}:${minutesDisplay(sunset)}`,
      });
    }
  }, [currentData]);

  const temperature = () => {
    if (weather.current) {
      return Math.round(weather.current.temp) + '°F';
    } else {
      return '';
    }
  };

  return (
    <div className="current">
      {loaded && (
        <div className="current-weather">
          <div className="current-date">{date}</div>
          <div className="current-city">{choice?.name}</div>
          <div className="current-temp">{temperature()}</div>
          <div>
            {weather.current.weather[0].description.charAt(0).toUpperCase() +
              weather.current.weather[0].description.slice(1)}
          </div>
          <div>
            <div>Sunrise {sun.rise}</div>
            <div>Sunset {sun.set}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Current;
