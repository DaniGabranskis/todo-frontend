import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import { getToken } from './utils/token';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Подождём проверку
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={isLoggedIn ? <TodoPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
