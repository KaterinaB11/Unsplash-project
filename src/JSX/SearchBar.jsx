import React, { useState } from 'react';
import '../SCSS/App.scss';
import AuthorInfo from './AuthorInfo';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function SearchBar (){
  const [searchKeyword, setSearchKeyword] = useState('');
  const [imageResults, setImageResults] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword !== "") {
      const apiKey = "JOka4Zkw_-EOKGwoJ3WDtnArOhuoUSkC9SXxdAOn0dk"; 
      const apiUrl = `https://api.unsplash.com/search/photos?query=${searchKeyword}&client_id=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setImageResults(data.results);
        })
        .catch(error => {
          console.error('Error fetching images:', error);
        });
    } else {
      alert("Please enter a search keyword");
    }
  };

  const handleAuthorClick = (authorUsername) => {
    setSelectedAuthor(authorUsername);
    navigate('/${authorUsername');
  };

  return (
    <div className="app">
      <h1>Image Search App</h1>

      <div>
        <label htmlFor="searchInput">Search for images:</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Enter your search keyword"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {selectedAuthor && (
        <AuthorInfo authorUsername={selectedAuthor} apiKey="JOka4Zkw_-EOKGwoJ3WDtnArOhuoUSkC9SXxdAOn0dk" />
      )}

      <div className="imageResults">
        {imageResults.map(image => (
          <div key={image.id} onClick={() => handleAuthorClick(image.user.username)}>
            <Link to={`/${image.user.username}`} onClick={() => handleAuthorClick(image.user.username)}>
              <img src={image.urls.small} alt={image.alt_description} />
              <p>Author: {image.user.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
