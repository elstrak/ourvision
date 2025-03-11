// src/admin/components/stats/StatList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatList.css';
import StatForm from './StatForm';

const StatList = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStat, setCurrentStat] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Загрузка статистики
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/stats');
      setStats(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке статистики:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при загрузке статистики'
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Открытие формы для создания/редактирования
  const openForm = (stat = null) => {
    setCurrentStat(stat);
    setIsFormOpen(true);
  };

  // Открытие модального окна для подтверждения удаления
  const openDeleteModal = (stat) => {
    setCurrentStat(stat);
    setIsDeleteModalOpen(true);
  };

  // Закрытие всех модальных окон
  const closeModals = () => {
    setIsFormOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentStat(null);
  };

  // Создание/обновление статистики
  const handleSaveStat = async (formData) => {
    try {
      if (currentStat) {
        // Обновление существующей статистики
        await axios.put(`/api/stats/${currentStat._id}`, formData);
        setAlert({
          show: true,
          type: 'success',
          message: 'Статистика успешно обновлена'
        });
      } else {
        // Создание новой статистики
        await axios.post('/api/stats', formData);
        setAlert({
          show: true,
          type: 'success',
          message: 'Статистика успешно создана'
        });
      }
      closeModals();
      fetchStats();
    } catch (err) {
      console.error('Ошибка при сохранении статистики:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при сохранении статистики'
      });
    }
  };

  // Удаление статистики
  const handleDeleteStat = async () => {
    try {
      await axios.delete(`/api/stats/${currentStat._id}`);
      setAlert({
        show: true,
        type: 'success',
        message: 'Статистика успешно удалена'
      });
      closeModals();
      fetchStats();
    } catch (err) {
      console.error('Ошибка при удалении статистики:', err);
      setAlert({
        show: true,
        type: 'error',
        message: 'Ошибка при удалении статистики'
      });
    }
  };

  return (
    <div className="admin-stats-container">
      <div className="admin-stats-header">
        <h2>Управление статистикой</h2>
        <button 
          className="admin-btn admin-btn-primary" 
          onClick={() => openForm()}
        >
          <i className="fas fa-plus"></i> Добавить
        </button>
      </div>

      {alert.show && (
        <div className={`admin-alert admin-alert-${alert.type}`}>
          {alert.message}
          <button 
            className="admin-alert-close" 
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Загрузка...</div>
      ) : (
        <div className="admin-stats-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Число</th>
                <th>Описание</th>
                <th>Порядок</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td colSpan="4" className="admin-table-empty">
                    Нет данных
                  </td>
                </tr>
              ) : (
                stats.map((stat) => (
                  <tr key={stat._id}>
                    <td>{stat.number}</td>
                    <td>{stat.text}</td>
                    <td>{stat.order}</td>
                    <td className="admin-table-actions">
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-edit"
                        onClick={() => openForm(stat)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="admin-btn admin-btn-sm admin-btn-delete"
                        onClick={() => openDeleteModal(stat)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Форма создания/редактирования */}
      {isFormOpen && (
        <StatForm 
          stat={currentStat} 
          onSave={handleSaveStat} 
          onCancel={closeModals} 
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {isDeleteModalOpen && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>Подтверждение удаления</h3>
            <p>Вы уверены, что хотите удалить эту статистику?</p>
            <div className="admin-modal-actions">
              <button 
                className="admin-btn admin-btn-secondary"
                onClick={closeModals}
              >
                Отмена
              </button>
              <button 
                className="admin-btn admin-btn-delete"
                onClick={handleDeleteStat}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatList;