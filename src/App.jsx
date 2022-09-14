import React from 'react';
import Search from './components/Search/Search';
import './app.css';
import { API } from './components/api';

const App = () => {
  const [weather, setWeather] = React.useState([]);
  const [geo, setGeo] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [search, setSearch] = React.useState('');

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
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
    setLoading(true);
  };

  const handleWeather = async (e) => {
    let city = e.target.innerText;
    const selection = geo.filter((item) => item.name === city);
    try {
      let res = await fetch(API.WEATHER(selection[0].lat, selection[0].lon));
      let data = await res.json();
      setWeather(data);
      console.log('weather', data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const searchData = {
    geo,
    loading,
    onSubmit: handleSubmit,
    onClick: handleWeather,
    search,
    onChange: handleChange,
  };

  return (
    <div className="app">
      <div className="container">
        <Search {...searchData} />
      </div>
    </div>
  );
};

export default App;
