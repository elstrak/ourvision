// src/admin/components/layout/AdminSidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-tachometer-alt', text: 'Дашборд' },
    { path: '/admin/projects', icon: 'fas fa-briefcase', text: 'Проекты' },
    { path: '/admin/jobs', icon: 'fas fa-user-tie', text: 'Вакансии' },
    { path: '/admin/trends', icon: 'fas fa-chart-line', text: 'Тренды' },
    { path: '/admin/briefs', icon: 'fas fa-clipboard-list', text: 'Заявки' },
    { path: '/admin/stats', icon: 'fas fa-chart-bar', text: 'Статистика' },
    { path: '/admin/testimonials', icon: 'fas fa-comment', text: 'Отзывы' },
    { path: '/admin/team', icon: 'fas fa-users', text: 'Команда' },
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <nav className="admin-nav">
        <ul className="admin-nav-list">
          {menuItems.map((item, index) => (
            <li key={index} className="admin-nav-item">
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? 'admin-nav-link active' : 'admin-nav-link'
                }
              >
                <i className={item.icon}></i>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;