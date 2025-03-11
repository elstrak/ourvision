// src/admin/pages/AdminStats.js
import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import StatList from '../components/stats/StatList';
import './AdminStats.css';

const AdminStats = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={sidebarOpen} />
      
      <main className="admin-content">
        <div className="admin-page-header">
          <h2>Управление статистикой</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять статистические данные, отображаемые на сайте.</p>
        </div>
        
        <StatList />
      </main>
    </div>
  );
};

export default AdminStats;