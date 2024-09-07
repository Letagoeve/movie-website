import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import WatchList from "../components/WatchList/WatchList";
import MovieDetail from "../components/MovieDetail/MovieDetail";
import NotFound from "../components/NotFound/NotFound";
import Search from "../components/Search/Search";
import GenreList from "../components/Genre/GenreList";
// import User from "../components/User/User";
import Actors from "../pages/Actors/Actors"
// import Navbar from "../components/Navbar/Navbar";
import Genre from "../components/Genre/Genre"
import ActorDetail from "../pages/Actors/ActorDetail";
import SearchResults from "../components/Search/SearchResults";




function RoutesConfig() {
  return (
    <Suspense fallback={<h3>Please wait while loading the page...</h3>}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/watchList" element={<WatchList />} /> */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults/>} />
        {/* <Route path="/user" element={<User />} /> */}
         <Route path="*" element={<NotFound />} /> 
         <Route path="/genres" element={<GenreList />} />
        <Route path="/genre/:id" element={<Genre />} /> */
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/actors/:id" element={<ActorDetail />} />
        <Route path="/actor/:id" element={<ActorDetail/>} />
        <Route path="/relatedMovie/:id" element={<MovieDetail />} />
         
      </Routes>

    </Suspense>
  );
}

export default RoutesConfig;