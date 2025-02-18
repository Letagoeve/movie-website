// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../../components/Hero/Hero';
import MovieCard from '../../components/Movies/movieCard'; // Import the new MovieCard component
import './Home.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingRes, nowPlayingRes] = await Promise.all([
          axios.get('https://api.themoviedb.org/3/trending/movie/day', {
            params: { api_key: API_KEY },
          }),
          axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            params: { api_key: API_KEY },
          }),
        ]);

        setTrendingMovies(trendingRes.data.results);
        setNowPlaying(nowPlayingRes.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  return (
    <div className="home">
      <Hero />

      <section className="trending">
        <h2>Trending Movies</h2>
        <div className="movie-list">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleAddToWatchlist={handleAddToWatchlist}
              isInWatchlist={watchlist.some((item) => item.id === movie.id)}
            />
          ))}
        </div>
      </section>

      <section className="now-playing">
        <h2>Now Playing</h2>
        <div className="movie-list">
          {nowPlaying.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleAddToWatchlist={handleAddToWatchlist}
              isInWatchlist={watchlist.some((item) => item.id === movie.id)}
            />
          ))}
        </div>
      </section>

      {watchlist.length > 0 && (
        <section className="watchlist">
          <h2>My Watchlist</h2>
          <div className="movie-list">
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleAddToWatchlist={handleAddToWatchlist}
                isInWatchlist={true}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
