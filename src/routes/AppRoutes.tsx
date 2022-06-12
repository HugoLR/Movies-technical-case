import { Routes, Route, Navigate } from "react-router-dom";

import Home from "~pages/Home";
import WatchList from "~pages/WatchList";
import MovieDetail from "~pages/MovieDetail";
import MainLayout from "~templates/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies/home" replace />} />
      <Route path="movies" element={<MainLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="watchlist" element={<WatchList />} />
      </Route>
      <Route path="movies">
        <Route path="detail/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
