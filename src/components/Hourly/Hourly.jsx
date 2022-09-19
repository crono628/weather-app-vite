import React, { useEffect, useState } from 'react';
import './hourly.css';
import { minutesDisplay, hourDisplay } from '../helpers';
import { iconSelection } from '../helpers';

const Hourly = ({ currentData }) => {
  const { weather, loading } = currentData;
  const [time, setTime] = useState([]);
  const [date, setDate] = useState([]);
  const [temp, setTemp] = useState([]);
  const [icons, setIcons] = useState([]);
  const loaded = Boolean(loading === false && weather.hourly);

  useEffect(() => {
    if (weather.hourly) {
      let timezoneOffset = (weather.timezone_offset / 60 / 60) * -1;
      let hours = weather.hourly.map((hour) => {
        return `${hourDisplay(
          new Date(hour.dt * 1000),
          timezoneOffset
        )}:${minutesDisplay(new Date(hour.dt * 1000))}`;
      });
      let temps = weather.hourly.map((hour) => {
        return Math.round(hour.temp) + '°F';
      });
      let iconIds = weather.hourly.map((hour) => {
        return hour.weather[0].id;
      });
      let dates = weather.hourly.map((hour) => {
        let todaysDate = new Date(hour.dt * 1000);
        return `${todaysDate.getMonth() + 1}/${todaysDate.getDate()}`;
      });
      setDate(dates);
      setTime(hours);
      setTemp(temps);
      setIcons(iconIds);
    }
  }, [currentData]);

  return (
    loaded && (
      <div>
        <div className="hourly">
          {loaded && (
            <div className="hourly-container">
              {time.map((hour, index) => {
                return (
                  <div className="hourly-hour" key={index}>
                    <div className="hourly-date">{date[index]}</div>
                    <div className="hourly-time">{hour}</div>
                    <div className="hourly-temp">{temp[index]}</div>

                    <div className="hourly-icon">
                      <img
                        src={iconSelection(icons[index])}
                        alt="weather icon"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="scroll-prompt">Scroll for hourly forecast →</div>
        </div>
      </div>
    )
  );
};

export default Hourly;
