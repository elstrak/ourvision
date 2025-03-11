// src/admin/components/testimonials/TestimonialForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TestimonialForm.css';

const TestimonialForm = ({ projectId, testimonial, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    text: '',
    contactInfo: '',
    relatedProjectId: ''
  });
  
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRelatedProject, setShowRelatedProject] = useState(false);
  
  // Загрузка списка проектов для выбора связанного проекта
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/api/projects');
        setProjects(res.data.data);
      } catch (err) {
        console.error('Ошибка при загрузке проектов:', err);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Инициализация формы при редактировании
  useEffect(() => {
    if (testimonial) {
      setFormData({
        text: testimonial.text || '',
        contactInfo: testimonial.contactInfo || '',
        relatedProjectId: testimonial.relatedProjectId || ''
      });
      setShowRelatedProject(!!testimonial.relatedProjectId);
    }
  }, [testimonial]);
  
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
  
  // Обработка переключателя связанного проекта
  const handleToggleRelatedProject = () => {
    setShowRelatedProject(!showRelatedProject);
    if (!showRelatedProject) {
      setFormData({
        ...formData,
        relatedProjectId: ''
      });
    }
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = 'Текст отзыва обязателен';
    }
    
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Контактная информация обязательна';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Если связанный проект не выбран, устанавливаем его в null
    const dataToSubmit = {
      ...formData,
      relatedProjectId: showRelatedProject ? formData.relatedProjectId : null
    };
    
    setLoading(true);
    
    try {
      let response;
      
      if (testimonial) {
        // Обновление существующего отзыва
        response = await axios.put(
          `/api/projects/${projectId}/testimonials/${testimonial._id}`,
          dataToSubmit
        );
      } else {
        // Создание нового отзыва
        response = await axios.post(
          `/api/projects/${projectId}/testimonials`,
          dataToSubmit
        );
      }
      
      setLoading(false);
      onSave(response.data.data);
    } catch (err) {
      console.error('Ошибка при сохранении отзыва:', err);
      setLoading(false);
      
      if (err.response && err.response.data && err.response.data.error) {
        setErrors({
          ...errors,
          general: err.response.data.error
        });
      } else {
        setErrors({
          ...errors,
          general: 'Произошла ошибка при сохранении отзыва'
        });
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="testimonial-form">
      {errors.general && (
        <div className="form-error general">{errors.general}</div>
      )}
      
      <div className="form-group">
        <label htmlFor="text">Текст отзыва *</label>
        <textarea
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          className={`form-control ${errors.text ? 'is-invalid' : ''}`}
          rows="5"
          placeholder="Введите текст отзыва"
        ></textarea>
        {errors.text && <div className="form-error">{errors.text}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="contactInfo">Контактная информация *</label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className={`form-control ${errors.contactInfo ? 'is-invalid' : ''}`}
          placeholder="Имя, компания или другая контактная информация"
        />
        {errors.contactInfo && <div className="form-error">{errors.contactInfo}</div>}
      </div>
      
      <div className="form-group related-project-toggle">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showRelatedProject}
            onChange={handleToggleRelatedProject}
          />
          Указать связанный проект
        </label>
      </div>
      
      {showRelatedProject && (
        <div className="form-group">
          <label htmlFor="relatedProjectId">Выберите связанный проект</label>
          <select
            id="relatedProjectId"
            name="relatedProjectId"
            value={formData.relatedProjectId}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Не выбрано</option>
            {projects
              .filter(p => p._id !== projectId) // Исключаем текущий проект
              .map(project => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
          </select>
        </div>
      )}
      
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Сохранение...' : (testimonial ? 'Обновить отзыв' : 'Добавить отзыв')}
        </button>
      </div>
    </form>
  );
};

export default TestimonialForm;