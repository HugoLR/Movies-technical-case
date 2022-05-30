import { Routes, Route, Navigate } from "react-router-dom";

import Home from "~pages/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
