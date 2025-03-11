import React, { useState, useEffect } from 'react';
import './TeamForm.css';

const TeamForm = ({ member, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    description: '',
    color: '#000000',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (member) {
      setFormData({
        id: member._id,
        name: member.name,
        position: member.position,
        description: member.description,
        color: member.color,
        image: member.image
      });
      setImagePreview(member.image);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Обработчик для ручного ввода кода цвета
  const handleColorInputChange = (e) => {
    let value = e.target.value;
    
    // Разрешаем пустую строку для возможности стирания
    if (value === '') {
      setFormData({
        ...formData,
        color: '#'
      });
      return;
    }
    
    // Добавляем # в начало, если его нет
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
    
    // Обновляем значение в любом случае, чтобы пользователь мог редактировать
    setFormData({
      ...formData,
      color: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Создаем URL для предпросмотра
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Должность обязательна для заполнения';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
    }
    
    if (!imagePreview && !member) {
      newErrors.image = 'Изображение обязательно для загрузки';
    }
    
    // Проверка валидности цвета
    if (formData.color && !/^#([0-9A-F]{3}){1,2}$/i.test(formData.color)) {
      newErrors.color = 'Введите корректный код цвета в формате #RGB или #RRGGBB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Создаем FormData для отправки файла
    const submitData = new FormData();
    
    // Добавляем все поля формы
    Object.keys(formData).forEach(key => {
      if (key !== 'image' || !imageFile) {
        submitData.append(key, formData[key]);
      }
    });
    
    // Добавляем файл изображения, если он был выбран
    if (imageFile) {
      submitData.append('imageFile', imageFile);
    }
    
    // Вызываем функцию сохранения
    onSave(submitData);
  };

  return (
    <div className="team-form-container">
      <h2>{member ? 'Редактировать члена команды' : 'Добавить нового члена команды'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="position">Должность</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={errors.position ? 'error' : ''}
          />
          {errors.position && <div className="error-message">{errors.position}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="color">Цвет</label>
          <div className="color-picker-container">
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
            <input
              type="text"
              id="colorCode"
              value={formData.color}
              onChange={handleColorInputChange}
              placeholder="#RRGGBB"
              className={`color-input ${errors.color ? 'error' : ''}`}
            />
          </div>
          {errors.color && <div className="error-message">{errors.color}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Фото</label>
          <input
            type="file"
            id="image"
            name="imageFile"
            onChange={handleImageChange}
            accept="image/*"
            className={errors.image ? 'error' : ''}
          />
          {errors.image && <div className="error-message">{errors.image}</div>}
          
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {member ? 'Сохранить изменения' : 'Добавить члена команды'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;