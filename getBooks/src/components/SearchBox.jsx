import React from 'react';

const SearchBox = ({ onSearch }) => {
  return (
    <input
      className="Search-Books"
      type="text"
      placeholder="Search Books"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
