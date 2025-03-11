// src/admin/components/trends/TrendForm.js
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TrendForm.css';

const TrendForm = ({ initialData, onSave, onCancel, saving }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    image: '',
    featured: false,
    published: true
  });
  
  const [errors, setErrors] = useState({});
  
  // Инициализация формы при редактировании
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  
  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Очистка ошибки при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Обработка изменений в редакторе
  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content
    });
    
    // Очистка ошибки при изменении контента
    if (errors.content) {
      setErrors({
        ...errors,
        content: null
      });
    }
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название тренда обязательно';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Краткое описание тренда обязательно';
    }
    
    if (!formData.content || formData.content === '<p><br></p>') {
      newErrors.content = 'Содержание тренда обязательно';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'URL изображения обязателен';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Введите корректный URL изображения';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Категория обязательна';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Проверка валидности URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  // Настройки для редактора Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }]
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align'
  ];
  
  return (
    <form className="trend-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Название тренда*</label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-control ${errors.title ? 'error' : ''}`}
          value={formData.title}
          onChange={handleChange}
          required
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Категория*</label>
        <input
          type="text"
          id="category"
          name="category"
          className={`form-control ${errors.category ? 'error' : ''}`}
          value={formData.category}
          onChange={handleChange}
          required
        />
        {errors.category && <div className="error-message">{errors.category}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="image">URL изображения*</label>
        <input
          type="text"
          id="image"
          name="image"
          className={`form-control ${errors.image ? 'error' : ''}`}
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <div className="error-message">{errors.image}</div>}
        
        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Предпросмотр" />
          </div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Краткое описание*</label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'error' : ''}`}
          value={formData.description}
          onChange={handleChange}
          rows="3"
          required
          placeholder="Краткое описание для превью (до 200 символов)"
        ></textarea>
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Содержание тренда*</label>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          className={errors.content ? 'quill-error' : ''}
          placeholder="Напишите полное содержание тренда здесь..."
          required
        />
        {errors.content && <div className="error-message">{errors.content}</div>}
      </div>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span>Отметить как популярное</span>
        </label>
      </div>
      
      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          <span>Опубликовать</span>
        </label>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={saving}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default TrendForm;