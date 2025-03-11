// src/admin/components/stats/StatForm.js
import React, { useState, useEffect } from 'react';
import './StatForm.css';

const StatForm = ({ stat, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    number: '',
    text: '',
    order: 0
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (stat) {
      setFormData({
        number: stat.number || '',
        text: stat.text || '',
        order: stat.order || 0
      });
    }
  }, [stat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.number.trim()) {
      newErrors.number = 'Число обязательно для заполнения';
    }
    
    if (!formData.text.trim()) {
      newErrors.text = 'Описание обязательно для заполнения';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="admin-modal">
      <div className="admin-modal-content">
        <h3>{stat ? 'Редактировать статистику' : 'Добавить статистику'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="number">Число</label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className={errors.number ? 'admin-input-error' : ''}
            />
            {errors.number && <div className="admin-error-message">{errors.number}</div>}
          </div>
          
          <div className="admin-form-group">
            <label htmlFor="text">Описание</label>
            <input
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className={errors.text ? 'admin-input-error' : ''}
            />
            {errors.text && <div className="admin-error-message">{errors.text}</div>}
          </div>
          
          <div className="admin-form-group">
            <label htmlFor="order">Порядок отображения</label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
            />
          </div>
          
          <div className="admin-form-actions">
            <button 
              type="button" 
              className="admin-btn admin-btn-secondary"
              onClick={onCancel}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="admin-btn admin-btn-primary"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatForm;