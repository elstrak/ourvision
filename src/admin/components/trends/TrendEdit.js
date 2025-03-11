import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TrendForm from './TrendForm';
import './TrendEdit.css';

const TrendEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const isNewTrend = !id || id === 'new';

  useEffect(() => {
    if (isNewTrend) {
      // Для нового тренда устанавливаем начальные значения
      setTrend({
        title: '',
        category: '',
        description: '',
        content: '',
        image: '',
        featured: false,
        published: true
      });
      setLoading(false);
    } else {
      // Загружаем существующий тренд
      fetchTrend();
    }
  }, [id, isNewTrend]);

  const fetchTrend = async () => {
    try {
      const response = await axios.get(`/api/trends/${id}`);
      setTrend(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке тренда:', err);
      setError(`Не удалось загрузить тренд: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      setError(null);
      
      let response;
      
      if (isNewTrend) {
        // Создание нового тренда
        const { _id, ...dataWithoutId } = formData;
        response = await axios.post('/api/trends', dataWithoutId);
      } else {
        // Обновление существующего тренда
        const { _id, ...dataWithoutId } = formData;
        response = await axios.put(`/api/trends/${id}`, dataWithoutId);
      }
      
      navigate('/admin/trends');
    } catch (err) {
      console.error('Ошибка при сохранении тренда:', err);
      setError(err.response?.data?.error || 'Не удалось сохранить тренд');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/trends');
  };

  if (loading) {
    return (
      <div className="trend-edit-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="trend-edit-container">
      <h2>{isNewTrend ? 'Создать новый тренд' : 'Редактировать тренд'}</h2>
      {error && <div className="error-message">{error}</div>}
      <TrendForm 
        initialData={trend} 
        onSave={handleSave} 
        onCancel={handleCancel}
        saving={saving}
      />
    </div>
  );
};

export default TrendEdit;