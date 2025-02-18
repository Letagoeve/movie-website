// NowPlayingMovies.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Star } from 'lucide-react';
import './NowPlayingMovies.css';

const NowPlayingMovies = ({ movies }) => {
  return (
    <section className="now-playing">
      <h2>Now Playing</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <NavLink to={`/movie/${movie.id}`} className="movie-image-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </NavLink>
            <div className="rating-badge">
              <Star size={14} />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="release-date">
                {new Date(movie.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NowPlayingMovies;
