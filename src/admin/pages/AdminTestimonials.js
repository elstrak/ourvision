// src/admin/pages/AdminTestimonials.js
import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import AdminSidebar from '../components/layout/AdminSidebar';
import axios from 'axios';
import TestimonialList from '../components/testimonials/TestimonialList';
import './AdminTestimonials.css';

const AdminTestimonials = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Загрузка списка проектов
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/projects');
        setProjects(res.data.data);
        
        // Выбираем первый проект по умолчанию
        if (res.data.data.length > 0) {
          setSelectedProject(res.data.data[0]._id);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке проектов:', err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Обработчик изменения выбранного проекта
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} />
      <AdminSidebar isOpen={sidebarOpen} />
      
      <main className="admin-content">
        <div className="admin-page-header">
          <h2>Управление отзывами</h2>
          <p>Здесь вы можете добавлять, редактировать и удалять отзывы о проектах.</p>
        </div>
        
        {loading ? (
          <div className="loading-container">Загрузка проектов...</div>
        ) : (
          <>
            <div className="project-selector">
              <label htmlFor="project-select">Выберите проект:</label>
              <select 
                id="project-select" 
                value={selectedProject || ''} 
                onChange={handleProjectChange}
                className="project-select"
              >
                <option value="" disabled>Выберите проект</option>
                {projects.map(project => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedProject ? (
              <TestimonialList projectId={selectedProject} />
            ) : (
              <div className="no-project-selected">
                Выберите проект для управления отзывами
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminTestimonials;