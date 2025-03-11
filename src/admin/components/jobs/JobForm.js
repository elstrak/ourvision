// src/admin/components/jobs/JobForm.js
import React, { useState, useEffect } from 'react';
import './JobForm.css';

const JobForm = ({ job, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    department: '',
    salary: '',
    description: '',
    shortDescription: '',
    requirements: [''],
    responsibilities: [''],
    benefits: ['']
  });
  
  const [errors, setErrors] = useState({});
  
  // Инициализация формы при редактировании
  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        requirements: job.requirements?.length ? job.requirements : [''],
        responsibilities: job.responsibilities?.length ? job.responsibilities : [''],
        benefits: job.benefits?.length ? job.benefits : ['']
      });
    }
  }, [job]);
  
  // Обработка изменений в форме
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
  
  // Обработка изменений в массивах (требования, обязанности, преимущества)
  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    
    setFormData({
      ...formData,
      [arrayName]: updatedArray
    });
  };
  
  // Добавление нового элемента в массив
  const handleAddArrayItem = (arrayName) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], '']
    });
  };
  
  // Удаление элемента из массива
  const handleRemoveArrayItem = (index, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    
    setFormData({
      ...formData,
      [arrayName]: updatedArray.length ? updatedArray : ['']
    });
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название вакансии обязательно';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Локация обязательна';
    }
    
    if (!formData.type.trim()) {
      newErrors.type = 'Тип работы обязателен';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Фильтруем пустые элементы в массивах
      const cleanedFormData = {
        ...formData,
        requirements: formData.requirements.filter(item => item.trim()),
        responsibilities: formData.responsibilities.filter(item => item.trim()),
        benefits: formData.benefits.filter(item => item.trim())
      };
      
      onSave(cleanedFormData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="job-form">
      <div className="form-group">
        <label htmlFor="title">Название вакансии *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'form-control error' : 'form-control'}
          placeholder="Например: UI/UX Дизайнер"
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="location">Локация *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'form-control error' : 'form-control'}
            placeholder="Например: Москва"
          />
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Тип работы *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className={errors.type ? 'form-control error' : 'form-control'}
          >
            <option value="">Выберите тип работы</option>
            <option value="Полная занятость">Полная занятость</option>
            <option value="Частичная занятость">Частичная занятость</option>
            <option value="Проектная работа">Проектная работа</option>
            <option value="Стажировка">Стажировка</option>
            <option value="Удаленная работа">Удаленная работа</option>
          </select>
          {errors.type && <div className="error-message">{errors.type}</div>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="department">Отдел</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="Например: Дизайн"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="salary">Зарплата</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="Например: 120 000 - 180 000 ₽"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="shortDescription">Краткое описание</label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription || ''}
          onChange={handleChange}
          className="form-control"
          placeholder="Краткое описание для списка вакансий"
        />
        <small className="form-text text-muted">
          Если не указано, будет использовано начало основного описания
        </small>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Описание вакансии *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'form-control error' : 'form-control'}
          rows="4"
          placeholder="Подробное описание вакансии"
        ></textarea>
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      
      <div className="form-group">
        <label>Требования</label>
        {formData.requirements.map((requirement, index) => (
          <div key={index} className="array-item">
            <input
              type="text"
              value={requirement}
              onChange={(e) => handleArrayChange(e, index, 'requirements')}
              className="form-control"
              placeholder="Требование"
            />
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleRemoveArrayItem(index, 'requirements')}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => handleAddArrayItem('requirements')}
        >
          <i className="fas fa-plus"></i> Добавить требование
        </button>
      </div>
      
      <div className="form-group">
        <label>Обязанности</label>
        {formData.responsibilities.map((responsibility, index) => (
          <div key={index} className="array-item">
            <input
              type="text"
              value={responsibility}
              onChange={(e) => handleArrayChange(e, index, 'responsibilities')}
              className="form-control"
              placeholder="Обязанность"
            />
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleRemoveArrayItem(index, 'responsibilities')}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => handleAddArrayItem('responsibilities')}
        >
          <i className="fas fa-plus"></i> Добавить обязанность
        </button>
      </div>
      
      <div className="form-group">
        <label>Преимущества</label>
        {formData.benefits.map((benefit, index) => (
          <div key={index} className="array-item">
            <input
              type="text"
              value={benefit}
              onChange={(e) => handleArrayChange(e, index, 'benefits')}
              className="form-control"
              placeholder="Преимущество"
            />
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleRemoveArrayItem(index, 'benefits')}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={() => handleAddArrayItem('benefits')}
        >
          <i className="fas fa-plus"></i> Добавить преимущество
        </button>
      </div>
      
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : (job ? 'Обновить вакансию' : 'Создать вакансию')}
        </button>
      </div>
    </form>
  );
};

export default JobForm;