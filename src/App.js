import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import RoutesConfig from './routes/RoutesConfig';

const App = () => {
  const [searchResults, setSearchResults] = useState([]); // State for search results

  return (
    <Router>
      <Navbar setSearchResults={setSearchResults} />
      <RoutesConfig searchResults={searchResults} />
    </Router>
  );
};

export default App;
