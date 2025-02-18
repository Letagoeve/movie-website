import React, { useEffect, useState } from 'react';
import { Star, Clock, Calendar, Play, X } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TVShowsDetail.css';

const API_KEY = 'c4022936b88218d5d9f9c40c357cdb9b';

const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [relatedShows, setRelatedShows] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const [showResponse, recommendationsResponse, trailerResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations`, {
            params: { api_key: API_KEY },
          }),
          axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, {
            params: { api_key: API_KEY },
          }),
        ]);

        setTVShow(showResponse.data);
        setRelatedShows(recommendationsResponse.data.results.slice(0, 2));

        const youtubeTrailer = trailerResponse.data.results.find(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailerKey(youtubeTrailer ? youtubeTrailer.key : null);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    fetchTVShowDetails();
  }, [id]);

  const toggleTrailer = () => {
    setIsTrailerVisible(!isTrailerVisible);
  };

  if (!tvShow) return <div className="loading">Loading...</div>;

  return (
    <>
      <section className="tvshow-detail">
        <div className="tvshow-detail-background">
          <img
            src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
            alt={tvShow.name}
            className="tvshow-detail-backdrop"
            loading="eager"
          />
        </div>
        <div className="tvshow-detail-content">
          <h1 className="tvshow-detail-title">
            {tvShow.name}{' '}
            <span className="tvshow-detail-year">
              ({new Date(tvShow.first_air_date).getFullYear()})
            </span>
          </h1>
          <p className="tvshow-detail-overview">
            {tvShow.overview.length > 200
              ? `${tvShow.overview.substring(0, 200)}...`
              : tvShow.overview}
          </p>
          <div className="tvshow-detail-info">
            <div className="tvshow-detail-rating">
              <Star className="icon-star" size={20} />
              <span className="rating">{tvShow.vote_average.toFixed(1)}</span>
            </div>
            <div className="tvshow-detail-meta">
              <div className="meta-item">
                <Clock size={18} />
                <span>{tvShow.episode_run_time[0] || 0} min</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>
                  {new Date(tvShow.first_air_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
          {trailerKey ? (
            <button className="tvshow-detail-cta" onClick={toggleTrailer}>
              <Play size={20} />
              Watch Trailer
            </button>
          ) : (
            <button className="tvshow-detail-cta" disabled>
              No Trailer Available
            </button>
          )}
        </div>

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

      <div className="related-shows">
        <h2 className="related-shows-title">Related Shows</h2>
        <div className="related-shows-grid">
          {relatedShows.map((relatedShow) => (
            <div key={relatedShow.id} className="related-show-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${relatedShow.backdrop_path}`}
                alt={relatedShow.name}
                className="related-show-backdrop"
              />
              <div className="related-show-content">
                <h3 className="related-show-title">{relatedShow.name}</h3>
                <p className="related-show-subtitle">Available on GOTV</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TVShowDetail;
