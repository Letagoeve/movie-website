import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Movies.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: 'All',
    rating: 'All',
    searchTerm: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: { api_key: API_KEY },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: API_KEY,
            page: currentPage,
            with_genres: filters.genre === 'All' ? '' : filters.genre,
            'vote_average.gte': filters.rating === 'All' ? '' : filters.rating,
            query: filters.searchTerm,
          },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [filters, currentPage]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="movies-page">
      <div className="filters">
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleFilterChange}
          placeholder="Search Movies..."
        />
        <select name="genre" value={filters.genre} onChange={handleFilterChange}>
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
          <option value="All">All Ratings</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
      </div>

      {/* Pagination at the top */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }).slice(0, 5)}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`} // Navigate to the MovieDetailPage
              key={movie.id}
              className="movie-card"
            >
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{new Date(movie.release_date).getFullYear()}</p> {/* Show the year of release */}
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>

      {/* Pagination at the bottom */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }).slice(0, 5)}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
