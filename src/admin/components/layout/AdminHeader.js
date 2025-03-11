// src/admin/components/layout/AdminHeader.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import './AdminHeader.css';

const AdminHeader = ({ toggleSidebar }) => {
  const authContext = useContext(AuthContext);
  const { logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <Link to="/admin/dashboard" className="admin-logo">
          <span>Админ-панель</span>
        </Link>
      </div>
      <div className="admin-header-right">
        {user && (
          <span className="admin-user-name">
            {user.name}
          </span>
        )}
        <button onClick={onLogout} className="admin-logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Выйти</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;