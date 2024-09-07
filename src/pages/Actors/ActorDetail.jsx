import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ActorDetail.css';

const ActorDetail = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const actorResponse = await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
          params: {
            api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
          },
        });
        setActor(actorResponse.data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
        setError('Error fetching actor details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const moviesResponse = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
          params: {
            api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
          },
        });
        setMovies(moviesResponse.data.cast);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
        // Consider handling movie credits error separately (optional)
      }
    };

    fetchActorDetails();
    fetchMovieCredits();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="actor-detail-page">
      {actor && (
        <div className="actor-detail">
          <img
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : '/fallback-image-url.jpg'}
            alt={actor.name}
            className="actor-detail-image"
          />
          <div className="actor-info">
            <h1>{actor.name}</h1>
            <p><strong>Gender:</strong> {actor.gender === 1 ? 'Female' : 'Male'}</p>
            <p><strong>Popularity:</strong> {actor.popularity}</p>
            <p><strong>Birthday:</strong> {actor.birthday}</p>
            <p><strong>Biography:</strong> {actor.biography}</p>
          </div>
        </div>
      )}
      {movies.length > 0 && (
        <div className="actor-movies">
          <h2>Movies Participated in:</h2>
          <div className="movie-list-container">
            <div className="movie-list">
              {movies.map(movie => (
                <div className="movie-item" key={movie.id}>
                  <Link to={`/details/${movie.id}`} className="movie-link">
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/fallback-movie-poster.jpg'}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <p className="movie-title">{movie.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActorDetail;
