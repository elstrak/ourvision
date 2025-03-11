// src/admin/context/auth/authReducer.js
const authReducer = (state, action) => {
    switch (action.type) {
      case 'USER_LOADED':
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: action.payload
        };
      case 'LOGIN_SUCCESS':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case 'AUTH_ERROR':
      case 'LOGIN_FAIL':
      case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null,
          error: action.payload
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;