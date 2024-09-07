import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
// import logo from './logo.jpg';

export default function Navbar() {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [watchListCount, setWatchListCount] = useState(0);

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

  const handleGenreClick = () => {
    navigate('/genres');
  };

  return (
    <nav className="navbar vertical-navbar">
      <div className="navbar-content">
        <div className="d-flex align-items-center">
          {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
          <span className="navbar-brand-text">ConTv</span>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          
          {/* Genres Link */}
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={handleGenreClick}
            >
              Genres
            </a>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/actors">Actors</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/watchList" style={{ position: 'relative' }}>
              Favourites
              <span
                className="badge rounded-pill text-bg-light"
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-5px',
                  fontSize: '10px',
                  width: '20px',
                }}
              >
                {watchListCount}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
