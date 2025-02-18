import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Genre() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoviesByGenre() {
      setLoading(true);
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
            with_genres: id,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesByGenre();
  }, [id]);

  if (loading) return <h3>Loading movies...</h3>;

  return (
    <div>
      <h2>Movies for Genre ID: {id}</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
