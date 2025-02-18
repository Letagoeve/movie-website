import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from '../Search/Search'; // Import the Search component
import './Navbar.css';

export default function Navbar({ setSearchResults }) {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State for navbar toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for genre dropdown
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle the navbar state
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to the document level
    setDropdownOpen(!dropdownOpen);
  };

  const handleGenreClick = (genreId) => {
    console.log(`Navigating to genre: ${genreId}`); // Debugging
    setDropdownOpen(false); // Close the dropdown if necessary
    navigate(`/genre/${genreId}`); // Navigate to the genre page
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar .dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-content">
        <span className="navbar-brand-text">ConTv</span>
        <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">Movies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/tvshows">TV Shows</NavLink>
          </li>
          <li
            className={`nav-item dropdown ${dropdownOpen ? 'open' : ''}`}
            onClick={toggleDropdown}
          >
            <span className="nav-link dropdown-toggle">Genres</span>
            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
              <div className="genre-slider">
                {genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="dropdown-item genre-item"
                    onClick={() => handleGenreClick(genre.id)}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/actors">Actors</NavLink>
          </li>
        </ul>

        {/* Search Component */}
        <div className="search-container">
          <Search setSearchResults={setSearchResults} />
        </div>

        {/* Navbar Toggle Button */}
        <button className="navbar-toggle" onClick={toggleNavbar}>
          ☰
        </button>
      </div>
    </nav>
  );
}