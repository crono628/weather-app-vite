import React, { useEffect } from 'react';
import Search from './components/Search/Search';
import './app.css';
import { API } from './components/api';
import Current from './components/Current/Current';

const App = () => {
  const [weather, setWeather] = React.useState([]);
  const [geo, setGeo] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [choice, setChoice] = React.useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        isNaN(search) ? API.GEOCODE_NAME(search) : API.GEOCODE_ZIP(search)
      );
      let data = await res.json();
      isNaN(search) ? setGeo(data) : setGeo([data]);
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  };

  const handleWeather = async (e) => {
    let city = e.currentTarget.innerText.split(',').slice(0, 1);
    const selection = geo.filter((item) => item.name === city[0]);
    setChoice(selection[0]);
    try {
      let res = await fetch(API.WEATHER(selection[0].lat, selection[0].lon));
      let data = await res.json();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const searchData = {
    geo,
    loading,
    search,
    onSubmit: handleSubmit,
    onClick: handleWeather,
    onChange: handleChange,
  };

  const currentData = {
    weather,
    loading,
    choice,
  };

  return (
    <div className="app">
      <div className="container">
        <Search searchData={searchData} />
        <Current currentData={currentData} />
      </div>
    </div>
  );
};

export default App;
