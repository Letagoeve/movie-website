import { useEffect, useState } from 'react';
import { Star, Clock, Calendar, Play } from 'lucide-react';
import axios from 'axios';
import './Hero.css';
import { useNavigate } from 'react-router-dom';



const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

function Hero() {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        // Get popular movies
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/popular',
          {
            params: { api_key: API_KEY },
          }
        );

        // Randomly select one of the top 5 movies
        const randomIndex = Math.floor(Math.random() * 5);
        const selectedMovie = response.data.results[randomIndex];

        // Get additional movie details and videos
        const [detailsResponse, videosResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos`, {
            params: { api_key: API_KEY },
          }),
        ]);

        setMovie(detailsResponse.data);

        // Find a trailer video
        const trailer = videosResponse.data.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (!movie) {
    return null;
  }

  return (
    <section className="hero">
      <div className="hero-background">
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&showinfo=0&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media"
            title="movie trailer"
            className="absolute w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            loading="eager"
          />
        )}
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Explore Movies & TV Shows</h1>
        <p className="hero-subtitle">
          {movie.overview.length > 200
            ? `${movie.overview.substring(0, 200)}...`
            : movie.overview}
        </p>
        <div className="hero-movie-info">
          <div className="hero-movie-rating">
            <Star className="fill-current" size={20} />
            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="hero-movie-meta">
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
        <button className="hero-cta" onClick={() => navigate('/movies')}>
         <Play size={20} />
           Explore
        </button>
      </div>
    </section>
  );
}

export default Hero;