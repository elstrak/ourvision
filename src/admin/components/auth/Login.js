// src/admin/components/auth/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import './Login.css';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, error, clearErrors, loading } = authContext;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [alert, setAlert] = useState('');

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }

    if (error) {
      setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Пожалуйста, заполните все поля');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <div className="admin-login-logo">
          <img src="/logo.png" alt="Our Vision" />
        </div>
        <h2>Вход в админ-панель</h2>
        {alert && <div className="admin-alert">{alert}</div>}
        <form onSubmit={onSubmit}>
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="admin-btn" disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;