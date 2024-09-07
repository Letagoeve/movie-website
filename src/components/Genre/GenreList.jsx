import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GenreList.css';

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'c4022936b88218d5d9f9c40c357cdb9b',
          },
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    // Navigate to the correct genre page based on your route configuration
    navigate(`/genre/${genreId}`); // Fixed the route from `/genres/` to `/genre/`
  };

  return (
    <div className="genre-list">
      <h2>Select a Genre</h2>
      <div className="genres-container">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-item" onClick={() => handleGenreClick(genre.id)}>
            <img src={`https://via.placeholder.com/150x200?text=${genre.name}`} alt={genre.name} />
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
