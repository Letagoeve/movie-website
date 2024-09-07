import React, { useState } from 'react';

const GenresDropdown = ({ genres, handleGenreClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="genresDropdown"
        role="button"
        onClick={toggleDropdown}
      >
        Genres
      </a>
      {isDropdownOpen && (
        <ul className="dropdown-menu dropdown-menu-vertical" aria-labelledby="genresDropdown">
          {genres.map((genre) => (
            <li key={genre.id}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => {
                  handleGenreClick(genre.id);
                  setIsDropdownOpen(false); // Close dropdown after clicking
                }}
              >
                {genre.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default GenresDropdown;
