// src/admin/pages/AdminTrends.js
import React, { useState } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import TrendList from '../components/trends/TrendList';
import CategoryList from '../components/trends/CategoryList';
import './AdminTrends.css';

const AdminTrends = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('trends'); // 'trends' или 'categories'

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={sidebarOpen} />
      
      <main className="admin-content">
        <div className="admin-page-header">
          <h2>Управление трендами</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять тренды и категории.</p>
        </div>
        
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'trends' ? 'active' : ''}`}
            onClick={() => setActiveTab('trends')}
          >
            Тренды
          </button>
          <button 
            className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Категории
          </button>
        </div>
        
        {activeTab === 'trends' ? <TrendList /> : <CategoryList />}
      </main>
    </div>
  );
};

export default AdminTrends;