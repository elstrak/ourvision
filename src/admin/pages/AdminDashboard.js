// src/admin/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    jobs: 0,
    trends: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Получаем информацию о пользователе из localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Реальные API-запросы для получения статистики
        const [projectsRes, jobsRes, trendsRes] = await Promise.all([
          axios.get('/api/projects/count'),
          axios.get('/api/jobs/count'),
          axios.get('/api/trends/count')
        ]);
        
        setStats({
          projects: projectsRes.data.count,
          jobs: jobsRes.data.count,
          trends: trendsRes.data.count
        });
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке статистики:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={sidebarOpen} />
      
      <main className="admin-content">
        <div className="admin-page-header">
          <h2>Панель управления</h2>
          <p>Добро пожаловать, {user.name || 'Администратор'}!</p>
        </div>
        
        <div className="dashboard-stats">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Загрузка статистики...</p>
            </div>
          ) : (
            <>
              <div className="stat-card">
                <div className="stat-icon projects-icon">
                  <i className="fas fa-project-diagram"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.projects}</h3>
                  <p>Проектов</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon jobs-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.jobs}</h3>
                  <p>Вакансий</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon trends-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.trends}</h3>
                  <p>Трендов</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="dashboard-actions">
          <h3>Быстрые действия</h3>
          <div className="action-buttons">
            <a href="/admin/projects/new" className="action-btn">
              <i className="fas fa-plus"></i>
              <span>Добавить проект</span>
            </a>
            <a href="/admin/jobs/new" className="action-btn">
              <i className="fas fa-plus"></i>
              <span>Добавить вакансию</span>
            </a>
            <a href="/admin/trends/new" className="action-btn">
              <i className="fas fa-plus"></i>
              <span>Добавить тренд</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;