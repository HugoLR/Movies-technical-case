import { Routes, Route, Navigate } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="home" element={<h1>HOME</h1>} />
    </Routes>
  );
}

export default AppRoutes;
