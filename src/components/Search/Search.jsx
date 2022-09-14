import React from 'react';
import './search.css';

const Search = ({ searchData }) => {
  const { geo, loading, onSubmit, onClick, search, onChange } = searchData;
  return (
    <div className="search">
      <form name="search" onSubmit={onSubmit}>
        <input
          type="text"
          value={search}
          onChange={onChange}
          placeholder="Enter a city or zip code"
        />
        <button type="submit">Search</button>
        <div>
          <div
            className={`${
              loading === true
                ? 'vert-down'
                : loading === false
                ? 'vert-up'
                : 'hidden'
            } dropdown`}
          >
            <div className="search-title">Search Results:</div>
            {geo?.map((item, index) => (
              <div
                onClick={onClick}
                className="search-result"
                key={index + item.name}
              >
                {item.name}
                {isNaN(search) ? `, ${item.state}` : null}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
