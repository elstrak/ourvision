// src/admin/pages/AdminProjects.js
import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import ProjectList from '../components/projects/ProjectList';
import './AdminProjects.css';

const AdminProjects = () => {
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
          <h2>Управление проектами</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять проекты компании.</p>
        </div>
        
        <ProjectList />
      </main>
    </div>
  );
};

export default AdminProjects;