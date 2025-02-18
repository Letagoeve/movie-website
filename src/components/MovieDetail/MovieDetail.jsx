import React, { useEffect, useState } from 'react';
import { Star, Clock, Calendar, Play, X } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, recommendationsResponse, trailerResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: { api_key: API_KEY },
          }),
        ]);

        setMovie(movieResponse.data);
        setRelatedMovies(recommendationsResponse.data.results.slice(0, 2));

        // Extract the YouTube trailer key
        const youtubeTrailer = trailerResponse.data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailerKey(youtubeTrailer ? youtubeTrailer.key : null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleTrailer = () => {
    setIsTrailerVisible(!isTrailerVisible);
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail-container">
      <section className="movie-detail">
        <div className="movie-detail-background">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="movie-detail-backdrop"
            loading="eager"
          />
        </div>
        <div className="movie-detail-content">
          <h1 className="movie-detail-title">
            {movie.title}{' '}
            <span className="movie-detail-year">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>
          <p className="movie-detail-overview">
            {movie.overview.length > 200
              ? `${movie.overview.substring(0, 200)}...`
              : movie.overview}
          </p>
          <div className="movie-detail-info">
            <div className="movie-detail-rating">
              <Star className="icon-star" size={20} />
              <span className="rating">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="movie-detail-meta">
              <div className="meta-item">
                <Clock size={18} />
                <span>{movie.runtime} min</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>
                  {new Date(movie.release_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
          {trailerKey ? (
            <button className="movie-detail-cta" onClick={toggleTrailer}>
              <Play size={20} />
              Watch Trailer
            </button>
          ) : (
            <button className="movie-detail-cta" disabled>
              No Trailer Available
            </button>
          )}
        </div>

        {/* Trailer Popup */}
        {isTrailerVisible && (
          <div className="trailer-popup">
            <div className="trailer-popup-content">
              <button className="trailer-close-btn" onClick={toggleTrailer}>
                <X size={24} />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="YouTube Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </section>

      <div className="related-movies">
        <h2 className="related-movies-title">Related Movies</h2>
        <div className="related-movies-grid">
          {relatedMovies.map((relatedMovie) => (
            <div key={relatedMovie.id} className="related-movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${relatedMovie.backdrop_path}`}
                alt={relatedMovie.title}
                className="related-movie-backdrop"
              />
              <div className="related-movie-content">
                <h3 className="related-movie-title">{relatedMovie.title}</h3>
                <p className="related-movie-subtitle">Available on GOTV</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
