// src/admin/components/jobs/JobList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobList.css';
import JobForm from './JobForm';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Загрузка вакансий с API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/jobs');
      setJobs(response.data.data);
    } catch (err) {
      console.error('Ошибка при загрузке вакансий:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при загрузке вакансий'
      });
    } finally {
      setLoading(false);
    }
  };

  // Загрузка вакансий при монтировании компонента
  useEffect(() => {
    fetchJobs();
  }, []);

  // Открытие формы для создания/редактирования
  const openForm = (job = null) => {
    setCurrentJob(job);
    setIsFormOpen(true);
  };

  // Открытие модального окна для подтверждения удаления
  const openDeleteModal = (job) => {
    setCurrentJob(job);
    setIsDeleteModalOpen(true);
  };

  // Закрытие всех модальных окон
  const closeModals = () => {
    setIsFormOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentJob(null);
  };

  // Добавление новой вакансии
  const addJob = async (job) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/jobs', job);
      
      // Обновляем список вакансий
      setJobs([...jobs, response.data.data]);
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Вакансия успешно добавлена'
      });
      closeModals();
    } catch (err) {
      console.error('Ошибка при добавлении вакансии:', err);
      setAlert({
        show: true,
        type: 'error',
        message: err.response?.data?.error || 'Ошибка при добавлении вакансии'
      });
    } finally {
      setLoading(false);
    }
  };

  // Обновление вакансии
  const updateJob = async (updatedJob) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/jobs/${updatedJob._id}`, updatedJob);
      
      // Обновляем список вакансий
      setJobs(jobs.map(job => job._id === updatedJob._id ? response.data.data : job));
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Вакансия успешно обновлена'
      });
      closeModals();
    } catch (err) {
      console.error('Ошибка при обновлении вакансии:', err);
      setAlert({
        show: true,
        type: 'error',
        message: err.response?.data?.error || 'Ошибка при обновлении вакансии'
      });
    } finally {
      setLoading(false);
    }
  };

  // Удаление вакансии
  const deleteJob = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/jobs/${currentJob._id}`);
      
      // Обновляем список вакансий
      setJobs(jobs.filter(job => job._id !== currentJob._id));
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Вакансия успешно удалена'
      });
      closeModals();
    } catch (err) {
      console.error('Ошибка при удалении вакансии:', err);
      setAlert({
        show: true,
        type: 'error',
        message: err.response?.data?.error || 'Ошибка при удалении вакансии'
      });
    } finally {
      setLoading(false);
    }
  };

  // Скрытие уведомления через 3 секунды
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="job-list-container">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      
      <div className="job-list-header">
        <h3>Список вакансий</h3>
        <button 
          className="btn btn-primary" 
          onClick={() => openForm()}
        >
          <i className="fas fa-plus"></i> Добавить вакансию
        </button>
      </div>
      
      {loading && !isFormOpen && !isDeleteModalOpen ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка вакансий...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="empty-state">
          <p>Вакансии не найдены</p>
          <button 
            className="btn btn-primary" 
            onClick={() => openForm()}
          >
            Добавить первую вакансию
          </button>
        </div>
      ) : (
        <div className="job-table-container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Локация</th>
                <th>Тип</th>
                <th>Отдел</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>{job.department || 'Не указан'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => openForm(job)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => openDeleteModal(job)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{currentJob ? 'Редактировать вакансию' : 'Добавить вакансию'}</h3>
              <button className="close-btn" onClick={closeModals}>
                &times;
              </button>
            </div>
            <JobForm 
              job={currentJob} 
              onSave={currentJob ? updateJob : addJob} 
              onCancel={closeModals}
              loading={loading}
            />
          </div>
        </div>
      )}
      
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h3>Удаление вакансии</h3>
              <button className="close-btn" onClick={closeModals}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Вы уверены, что хотите удалить вакансию "{currentJob.title}"?</p>
              <p>Это действие нельзя отменить.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={closeModals}
                disabled={loading}
              >
                Отмена
              </button>
              <button 
                className="btn btn-danger" 
                onClick={deleteJob}
                disabled={loading}
              >
                {loading ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;