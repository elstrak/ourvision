// src/admin/context/auth/AuthState.js
import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Загрузка пользователя
  const loadUser = async () => {
    // Проверяем наличие токена
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      dispatch({ type: 'AUTH_ERROR' });
      return;
    }

    try {
      const res = await axios.get('/api/auth/me');
      
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  // Вход пользователя
  const login = async formData => {
    try {
      const res = await axios.post('/api/auth/login', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response?.data?.error || 'Ошибка авторизации'
      });
    }
  };

  // Выход пользователя
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
    } catch (err) {
      console.error('Ошибка при выходе:', err);
    }
    
    dispatch({ type: 'LOGOUT' });
  };

  // Очистка ошибок
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;