import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Search from '../../components/Search/Search';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b'; // Replace with your API key

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch trending movies
        const trendingResponse = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          params: { api_key: API_KEY },
        });
        setTrendingMovies(trendingResponse.data.results);

        // Fetch recently added movies
        const recentlyAddedResponse = await axios.get('https://api.themoviedb.org/3/movie/latest', {
          params: { api_key: API_KEY },
        });
        setRecentlyAdded([recentlyAddedResponse.data]);

        // Fetch now playing movies
        const nowPlayingResponse = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
          params: { api_key: API_KEY },
        });
        setNowPlaying(nowPlayingResponse.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <div className="home">
      <Search setSearchResults={setSearchResults} />

      {searchResults.length > 0 && (
        <section className="search-results">
          <h2>Search Results</h2>
          <div className="movie-list">
            {searchResults.map((movie) => (
              <div key={movie.id} className="movie-card">
                <NavLink to={`/movie/${movie.id}`} className="movie-image-link">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </NavLink>
                <div className="rating-badge">
                  <i className="fa-star"></i>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p className="release-date">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                  <p className="duration">Duration: {movie.runtime} minutes</p>
                  <button onClick={() => handleAddToWatchlist(movie)} className="heart-button">
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="trending">
        <h2>Trending Movies</h2>
        <div className="movie-list">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <NavLink to={`/movie/${movie.id}`} className="movie-image-link">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </NavLink>
              <div className="rating-badge">
                <i className="fa-star"></i>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="release-date">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                <p className="duration">Duration: {movie.runtime} minutes</p>
                <button onClick={() => handleAddToWatchlist(movie)} className="heart-button">
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="now-playing">
        <h2>Now Playing</h2>
        <div className="movie-list">
          {nowPlaying.map((movie) => (
            <div key={movie.id} className="movie-card">
              <NavLink to={`/movie/${movie.id}`} className="movie-image-link">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </NavLink>
              <div className="rating-badge">
                <i className="fa-star"></i>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p className="release-date">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                <p className="duration">Duration: {movie.runtime} minutes</p>
                <button onClick={() => handleAddToWatchlist(movie)} className="heart-button">
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {watchlist.length > 0 && (
        <section className="watchlist">
          <h2>My Watchlist</h2>
          <div className="movie-list">
            {watchlist.map((movie) => (
              <div key={movie.id} className="movie-card">
                <NavLink to={`/movie/${movie.id}`} className="movie-image-link">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </NavLink>
                <div className="rating-badge">
                  <i className="fa-star"></i>
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p className="release-date">Release Date: {new Date(movie.release_date).toLocaleDateString()}</p>
                  <p className="duration">Duration: {movie.runtime} minutes</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
