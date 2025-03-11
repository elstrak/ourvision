import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import TeamList from '../components/team/TeamList';
import './AdminTeam.css';

const AdminTeam = () => {
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
          <h2>Управление командой</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять членов команды, отображаемых на сайте.</p>
        </div>
        
        <TeamList />
      </main>
    </div>
  );
};

export default AdminTeam;