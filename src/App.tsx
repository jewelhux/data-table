import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Маршрут для авторизации */}
        <Route path="/login" element={<LoginForm />} />
        {/* Защищенные маршруты */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* Если маршрут не найден, перенаправляем на /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
