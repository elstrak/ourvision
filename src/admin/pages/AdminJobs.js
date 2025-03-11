// src/admin/pages/AdminJobs.js
import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import JobList from '../components/jobs/JobList';
import './AdminJobs.css';

const AdminJobs = () => {
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
          <h2>Управление вакансиями</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять вакансии компании.</p>
        </div>
        
        <JobList />
      </main>
    </div>
  );
};

export default AdminJobs;