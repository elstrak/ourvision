// src/admin/pages/AdminLogin.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  
  const { email, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (email === '' || password === '') {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Временное решение для тестирования
      if (email === 'admin@example.com' && password === 'password123') {
        // Имитация успешного ответа
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          name: 'Администратор',
          email: 'admin@example.com',
          role: 'admin'
        }));
        
        setIsLoggedIn(true);
      } else {
        setError('Неверные учетные данные');
      }
      
      // Закомментируйте реальный API-запрос на время тестирования
      // const res = await axios.post('/api/auth/login', { email, password });
      
      // if (res.data.success) {
      //   localStorage.setItem('token', res.data.token);
      //   localStorage.setItem('user', JSON.stringify({
      //     id: res.data.data._id,
      //     name: res.data.data.name,
      //     email: res.data.data.email,
      //     role: res.data.data.role
      //   }));
      //   
      //   setIsLoggedIn(true);
      // }
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при входе в систему');
    } finally {
      setLoading(false);
    }
  };
  
  // Если пользователь уже аутентифицирован, перенаправляем на дашборд
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" />;
  }
  
  return (
    <div className="admin-login-container">
      <div className="admin-login-form-container">
        <div className="admin-login-logo">
          <h1>Our Vision</h1>
          <p>Панель администратора</p>
        </div>
        
        <form className="admin-login-form" onSubmit={onSubmit}>
          {error && <div className="admin-login-error">{error}</div>}
          
          <div className="admin-login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="admin-login-form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;