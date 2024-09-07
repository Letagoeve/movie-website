import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './components/MovieDetail/MovieDetail'
import Navbar from './components/Navbar/Navbar';
import RoutesConfig from './routes/RoutesConfig';

const App = () => {
  return (
    <Router>
      <Navbar />
      <RoutesConfig/>
      
    </Router>
  );
};

export default App;
