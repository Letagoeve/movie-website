import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for API calls

function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      // Fetch movies and actors based on the search query
      axios.get(`API_ENDPOINT/search?query=${query}`)
        .then(response => {
          setResults(response.data.results);
        })
        .catch(error => console.error("Error fetching search results:", error));
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="results-list">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="result-card">
              <img src={result.poster_path} alt={result.title || result.name} />
              <h3>{result.title || result.name}</h3>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
