import axios from 'axios';

const API_KEY = '8afe5074060be25d0bd33528d579bc31'; // Your API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category = 'popular') => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${category}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {};
  }
};