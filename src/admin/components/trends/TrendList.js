import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TrendList.css';

const TrendList = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/trends');
      setTrends(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке трендов:', err);
      setError('Не удалось загрузить тренды. Пожалуйста, попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот тренд?')) {
      try {
        await axios.delete(`/api/trends/${id}`);
        fetchTrends();
      } catch (err) {
        console.error('Ошибка при удалении тренда:', err);
        setError('Не удалось удалить тренд. Пожалуйста, попробуйте позже.');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Загрузка трендов...</div>;
  }

  if (error) {
    return <div className="admin-error">{error}</div>;
  }

  return (
    <div className="trend-list-container">
      <div className="trend-list-header">
        <h2>Управление трендами</h2>
        <Link to="/admin/trends/new" className="add-trend-button">
          Добавить тренд
        </Link>
      </div>
      
      {trends.length === 0 ? (
        <div className="no-trends">
          <p>Трендов пока нет. Создайте первый тренд!</p>
        </div>
      ) : (
        <div className="trend-table-container">
          <table className="trend-table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Категория</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {trends.map(trend => (
                <tr key={trend._id}>
                  <td>{trend.title}</td>
                  <td>{trend.category}</td>
                  <td>
                    <span className={`status-badge ${trend.published ? 'published' : 'draft'}`}>
                      {trend.published ? 'Опубликован' : 'Черновик'}
                    </span>
                    {trend.featured && (
                      <span className="featured-badge">Рекомендуемый</span>
                    )}
                  </td>
                  <td>{new Date(trend.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <Link to={`/admin/trends/edit/${trend._id}`} className="edit-button">
                      Редактировать
                    </Link>
                    <button 
                      onClick={() => handleDelete(trend._id)} 
                      className="delete-button"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TrendList;