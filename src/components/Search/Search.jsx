import React from 'react';
import { API } from '../api';

const Search = () => {
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log('search', search);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(
        isNaN(search) ? API.GEOCODE_NAME(search) : API.GEOCODE_ZIP(search)
      );
      let data = await res.json();
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
