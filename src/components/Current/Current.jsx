import React from 'react';
import './current.css';

const Current = ({ currentData }) => {
  const { weather, loading } = currentData;
  const temp = () => {
    if (weather.current) {
      return Math.round(weather.current.temp);
    } else {
      return '';
    }
  };
  return (
    <div className="current">
      <h1
        className={`${
          loading === true
            ? 'vert-down'
            : loading === false
            ? 'vert-bottom'
            : 'hidden'
        } `}
      >
        {temp()}°
      </h1>
    </div>
  );
};

export default Current;
