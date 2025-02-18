import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, X } from 'lucide-react';
import './Search.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

function Search({ setSearchResults }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: API_KEY,
            query: debouncedQuery,
          },
        });
        setSuggestions(response.data.results.slice(0, 5));
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [debouncedQuery, setSearchResults]);

  const handleMovieClick = (movieId) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
        <SearchIcon className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          className="search-input"
        />
        {query && (
          <button
            className="clear-button"
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isSearchOpen && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="suggestion-item"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="suggestion-poster">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-poster">No Poster</div>
                )}
              </div>
              <div className="suggestion-info">
                <h4>{movie.title}</h4>
                <p>{movie.release_date?.split('-')[0] || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;