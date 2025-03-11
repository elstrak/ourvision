// src/admin/components/projects/ProjectList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectList.css';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Загрузка проектов
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/projects');
      setProjects(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке проектов:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при загрузке проектов'
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Открытие формы для создания/редактирования
  const openForm = (project = null) => {
    setCurrentProject(project);
    setIsFormOpen(true);
  };

  // Открытие модального окна для подтверждения удаления
  const openDeleteModal = (project) => {
    setCurrentProject(project);
    setIsDeleteModalOpen(true);
  };

  // Закрытие всех модальных окон
  const closeModals = () => {
    setIsFormOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentProject(null);
  };

  // Создание/обновление проекта
  const handleSaveProject = async (formData) => {
    try {
      if (currentProject) {
        // Обновление существующего проекта
        await axios.put(`/api/projects/${currentProject._id}`, formData);
        setAlert({
          show: true,
          type: 'success',
          message: 'Проект успешно обновлен'
        });
      } else {
        // Создание нового проекта
        await axios.post('/api/projects', formData);
        setAlert({
          show: true,
          type: 'success',
          message: 'Проект успешно создан'
        });
      }
      closeModals();
      fetchProjects();
    } catch (err) {
      console.error('Ошибка при сохранении проекта:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при сохранении проекта'
      });
    }
  };

  // Удаление проекта
  const handleDeleteProject = async (projectId) => {
    try {
      // Проверяем, что projectId является строкой
      if (typeof projectId !== 'string' && typeof projectId !== 'number') {
        throw new Error('Неверный формат ID проекта');
      }

      const response = await axios.delete(`/api/projects/${projectId}`);
      
      if (response.status === 200) {
        // Обновляем список проектов после успешного удаления
        setProjects(projects.filter(project => project._id !== projectId));
        setMessage('Проект успешно удален');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
      setMessage(error.response?.data?.message || 'Не удалось удалить проект');
      setMessageType('error');
    }
  };

  const renderProjects = () => {
    return projects.map(project => (
      <tr key={project._id}>
        <td>
          {project.coverImage ? (
            <img src={project.coverImage} alt={project.title} className="project-thumbnail" />
          ) : (
            <div className="no-image">Нет изображения</div>
          )}
        </td>
        <td>{project.title}</td>
        <td>{project.client}</td>
        <td>{project.industry}</td>
        <td>
          {project.services && project.services.length > 0 
            ? project.services.join(', ') 
            : 'Не указаны'}
        </td>
        <td>
          <span className={`featured-badge ${project.featured ? 'featured' : ''}`}>
            {project.featured ? 'Да' : 'Нет'}
          </span>
        </td>
        <td>
          <div className="action-buttons">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => openForm(project)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => openDeleteModal(project)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="project-list-container">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
          <button 
            className="alert-close" 
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </button>
        </div>
      )}
      
      <div className="project-list-header">
        <h3>Список проектов</h3>
        <button 
          className="btn btn-primary" 
          onClick={() => openForm()}
        >
          <i className="fas fa-plus"></i> Добавить проект
        </button>
      </div>
      
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка проектов...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <p>Проекты не найдены</p>
          <button 
            className="btn btn-primary" 
            onClick={() => openForm()}
          >
            Добавить первый проект
          </button>
        </div>
      ) : (
        <div className="project-table-container">
          <table className="project-table">
            <thead>
              <tr>
                <th>Обложка</th>
                <th>Название</th>
                <th>Клиент</th>
                <th>Сфера</th>
                <th>Услуга</th>
                <th>Избранный</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {renderProjects()}
            </tbody>
          </table>
        </div>
      )}
      
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{currentProject ? 'Редактировать проект' : 'Добавить проект'}</h3>
              <button className="modal-close" onClick={closeModals}>
                &times;
              </button>
            </div>
            <ProjectForm 
              project={currentProject} 
              onSave={handleSaveProject} 
              onCancel={closeModals} 
            />
          </div>
        </div>
      )}
      
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container delete-modal">
            <div className="modal-header">
              <h3>Удаление проекта</h3>
              <button className="modal-close" onClick={closeModals}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Вы уверены, что хотите удалить проект "{currentProject.title}"?</p>
              <p className="warning">Это действие нельзя отменить.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModals}>
                Отмена
              </button>
              <button className="btn btn-danger" onClick={() => handleDeleteProject(currentProject._id)}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;