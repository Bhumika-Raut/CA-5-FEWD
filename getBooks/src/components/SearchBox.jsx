import React from 'react';
const SearchBox = ({ onSearch }) => {
  return (
    <>
    <div className='search-section'>
    <input
      className="Search-Books"
      type="text"
      placeholder="Search Books"
      onChange={(e) => onSearch(e.target.value)}
    />
    </div>
    </>
  );
};

export default SearchBox;
