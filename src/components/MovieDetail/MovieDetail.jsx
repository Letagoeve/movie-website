import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import './MovieDetail.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: { api_key: API_KEY, append_to_response: 'credits,videos' },
        });
        setMovie(movieResponse.data);

        const actorsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        });
        setActors(actorsResponse.data.cast.slice(0, 4)); // Get top 4 actors

        const relatedMoviesResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
          params: { api_key: API_KEY },
        });
        setRelatedMovies(relatedMoviesResponse.data.results);

        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        });
        const trailer = videoResponse.data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setVideo(trailer ? trailer.key : null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <div className="movie-info">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      {video && (
        <div className="video-container">
          <h2>Trailer</h2>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <h2>Main Actors</h2>
      <div className="actors-list">
        {actors.map((actor) => (
          <NavLink key={actor.id} to={`/actor/${actor.id}`} className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </NavLink>
        ))}
      </div>
      <h2>Related Movies</h2>
      <div className="related-movies">
        {relatedMovies.map((relatedMovie) => (
          <NavLink key={relatedMovie.id} to={`/movie/${relatedMovie.id}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
              alt={relatedMovie.title}
            />
            <p>{relatedMovie.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
