// src/admin/pages/AdminBriefs.js
import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import BriefList from '../components/briefs/BriefList';

const AdminBriefs = () => {
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
          <h2>Управление заявками</h2>
          <p>Просмотр и обработка заявок, отправленных через форму брифа</p>
        </div>
        
        <BriefList />
      </main>
    </div>
  );
};

export default AdminBriefs;