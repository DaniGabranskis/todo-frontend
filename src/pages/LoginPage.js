import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import { saveToken } from '../utils/token';
import '../styles/login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Нажали на кнопку Login');

      const res = await API.post('/auth/login', { email, password });
      console.log('Ответ от сервера:', res.data);

      saveToken(res.data.token);
      console.log('Токен сохранён');

      console.log('Делаем редирект на /');
      navigate('/');
    } catch (err) {
      console.error('Ошибка при логине:', err);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
