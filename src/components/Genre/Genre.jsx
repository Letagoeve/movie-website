import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../Movies/movieCard';
import './Genre.css';

const genreNames = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const Genre = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
              with_genres: genreId,
              page: 1, // You might want to add pagination later
            },
          }
        );
       
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
        setError('Error fetching movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genreId]); // This ensures the effect runs when genreId changes

  const genreName = genreNames[parseInt(genreId)] || 'Movies';

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movies-by-genre">
      <h2>{genreName}</h2>
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No movies found for this genre.</p>
        )}
      </div>
    </div>
  );
};

export default Genre;