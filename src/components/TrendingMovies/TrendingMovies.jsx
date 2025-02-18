import React from 'react';
import { NavLink } from 'react-router-dom';
import { Star } from 'lucide-react';
import './TrendingMovies.css';

const TrendingMovies = ({ movies }) => {
  return (
    <section className="trending">
      <h2>Trending Movies</h2>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
