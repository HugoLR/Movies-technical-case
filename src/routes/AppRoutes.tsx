import { Routes, Route, Navigate } from "react-router-dom";

import Home from "~pages/Home";
import MovieDetail from "~pages/MovieDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/movies/home" replace />} />
      <Route path="movies">
        <Route path="home" element={<Home />} />
        <Route path="detail/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
