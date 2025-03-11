import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ProjectForm.css';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    aboutBrand: '',
    challenge: '',
    solution: '',
    industry: '',
    services: [],
    client: '',
    coverImage: '',
    gallery: [],
    videos: [],
    featured: false
  });
  
  const [errors, setErrors] = useState({});
  const [newImage, setNewImage] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [industries, setIndustries] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  
  const videoInputRef = useRef(null);
  
  // Список доступных сфер деятельности
  const availableIndustries = [
    'Электронная коммерция',
    'Финансы и банкинг',
    'Здравоохранение',
    'Образование',
    'Недвижимость',
    'Туризм',
    'Развлечения',
    'Технологии',
    'Производство',
    'Розничная торговля',
    'Другое'
  ];
  
  // Список доступных услуг
  const availableServices = [
    'Веб-разработка',
    'Мобильная разработка',
    'UI/UX дизайн',
    'Брендинг',
    'SEO-оптимизация',
    'Контент-маркетинг',
    'SMM',
    'Аналитика',
    'Консалтинг',
    'Техническая поддержка',
    'Другое'
  ];
  
  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const industriesRes = await axios.get('/api/categories?type=industry');
        const servicesRes = await axios.get('/api/categories?type=service');
        
        setIndustries(industriesRes.data.data);
        setServices(servicesRes.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err);
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Инициализация формы при редактировании
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        shortDescription: project.shortDescription || '',
        description: project.description || '',
        aboutBrand: project.aboutBrand || '',
        challenge: project.challenge || '',
        solution: project.solution || '',
        industry: project.industry || '',
        services: project.services || [],
        client: project.client || '',
        coverImage: project.coverImage || '',
        gallery: project.gallery || [],
        videos: project.videos || [],
        featured: project.featured || false
      });
      
      console.log('Загруженные услуги:', project.services); // Для отладки
    }
  }, [project]);
  
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
  
  // Обработка изменений в мультиселекте услуг
  const handleServicesChange = (e) => {
    const options = e.target.options;
    const selectedServices = [];
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedServices.push(options[i].value);
      }
    }
    
    setFormData({
      ...formData,
      services: selectedServices
    });
    
    console.log('Выбранные услуги:', selectedServices);
    
    // Очистка ошибки при изменении поля
    if (errors.services) {
      setErrors({
        ...errors,
        services: null
      });
    }
  };
  
  // Добавление изображения в галерею
  const handleAddImage = () => {
    if (!newImage.trim()) return;
    
    setFormData({
      ...formData,
      gallery: [...formData.gallery, newImage.trim()]
    });
    
    setNewImage('');
  };
  
  // Удаление изображения из галереи
  const handleRemoveImage = (index) => {
    const updatedGallery = [...formData.gallery];
    updatedGallery.splice(index, 1);
    
    setFormData({
      ...formData,
      gallery: updatedGallery
    });
  };
  
  // Загрузка видео
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Проверка типа файла
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        video: 'Неподдерживаемый формат файла. Разрешены только MP4, WebM, MOV и AVI.'
      });
      return;
    }
    
    // Проверка размера файла (100 МБ)
    if (file.size > 100 * 1024 * 1024) {
      setErrors({
        ...errors,
        video: 'Размер файла не должен превышать 100 МБ.'
      });
      return;
    }
    
    try {
      setUploadingVideo(true);
      setUploadProgress(0);
      
      const videoFormData = new FormData();
      videoFormData.append('video', file);
      
      const response = await axios.post('/api/upload/videos', videoFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });
      
      if (response.data.success) {
        setFormData(prevState => ({
          ...prevState,
          videos: [...prevState.videos, response.data.data]
        }));
        
        // Очистка ошибки
        if (errors.video) {
          setErrors({
            ...errors,
            video: null
          });
        }
      }
    } catch (err) {
      console.error('Ошибка при загрузке видео:', err);
      setErrors({
        ...errors,
        video: err.response?.data?.error || 'Ошибка при загрузке видео.'
      });
    } finally {
      setUploadingVideo(false);
      setUploadProgress(0);
      // Сброс input file
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    }
  };
  
  // Удаление видео
  const handleRemoveVideo = (index) => {
    const updatedVideos = [...formData.videos];
    updatedVideos.splice(index, 1);
    
    setFormData({
      ...formData,
      videos: updatedVideos
    });
  };
  
  // Функция для предпросмотра видео
  const handlePreviewVideo = (video) => {
    setPreviewVideo(video);
    // Можно добавить модальное окно для предпросмотра видео
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название проекта обязательно';
    }
    
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Краткое описание обязательно';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание проекта обязательно';
    }
    
    if (!formData.industry) {
      newErrors.industry = 'Выберите сферу деятельности';
    }
    
    if (!formData.services || formData.services.length === 0) {
      newErrors.services = 'Выберите хотя бы одну услугу';
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
    
    setLoading(true);
    
    try {
      console.log('Отправляемые данные:', formData); // Для отладки
      
      onSave(formData);
    } catch (err) {
      console.error('Ошибка при сохранении проекта:', err);
      setLoading(false);
      
      if (err.response && err.response.data && err.response.data.error) {
        alert(`Ошибка: ${err.response.data.error}`);
      } else {
        alert('Произошла ошибка при сохранении проекта');
      }
    }
  };
  
  console.log('Текущие услуги в formData:', formData.services);
  
  const renderVideoList = () => {
    return formData.videos && formData.videos.map((video, index) => {
      const videoName = typeof video === 'string' ? video.split('/').pop() : video.name;
      
      return (
        <div key={index} className="video-item">
          <span>{videoName}</span>
          <button 
            type="button" 
            onClick={() => handleRemoveVideo(index)}
            className="remove-video-btn"
          >
            Удалить
          </button>
          <button 
            type="button" 
            onClick={() => handlePreviewVideo(video)}
            className="preview-video-btn"
          >
            Просмотр
          </button>
        </div>
      );
    });
  };
  
  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <h3 className="section-title">Основная информация</h3>
      
      <div className="form-group">
        <label htmlFor="title">Название проекта*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'form-control error' : 'form-control'}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="shortDescription">Краткое описание* (до 200 символов)</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          className={errors.shortDescription ? 'form-control error' : 'form-control'}
          maxLength="200"
          rows="3"
        />
        {errors.shortDescription && <div className="error-message">{errors.shortDescription}</div>}
        <small className="form-text text-muted">{formData.shortDescription.length}/200</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Полное описание*</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'form-control error' : 'form-control'}
          rows="5"
        />
        {errors.description && <div className="error-message">{errors.description}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="aboutBrand">О бренде</label>
        <textarea
          id="aboutBrand"
          name="aboutBrand"
          value={formData.aboutBrand}
          onChange={handleChange}
          className="form-control"
          rows="4"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="challenge">Задача</label>
        <textarea
          id="challenge"
          name="challenge"
          value={formData.challenge}
          onChange={handleChange}
          className="form-control"
          rows="4"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="solution">Решение</label>
        <textarea
          id="solution"
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          className="form-control"
          rows="4"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="client">Клиент</label>
        <input
          type="text"
          id="client"
          name="client"
          value={formData.client}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="industry">Сфера деятельности*</label>
        <select
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className={errors.industry ? 'form-control error' : 'form-control'}
        >
          <option value="">Выберите сферу деятельности</option>
          {availableIndustries.map(industry => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
        {errors.industry && <div className="error-message">{errors.industry}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="services">Предоставленные услуги *</label>
        <select
          id="services"
          name="services"
          multiple
          value={formData.services || []}
          onChange={handleServicesChange}
          className={errors.services ? 'form-control error' : 'form-control'}
          size="5"
        >
          {availableServices.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">
          Удерживайте Ctrl (Cmd на Mac) для выбора нескольких услуг
        </small>
        {errors.services && <div className="error-message">{errors.services}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="coverImage">URL обложки проекта</label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className="form-control"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <h3 className="section-title">Галерея изображений</h3>
      
      <div className="form-group">
        <label htmlFor="newImage">Добавить изображение в галерею</label>
        <div className="input-group">
          <input
            type="text"
            id="newImage"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            className="form-control"
            placeholder="https://example.com/gallery-image.jpg"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddImage}
          >
            Добавить
          </button>
        </div>
      </div>
      
      {formData.gallery.length > 0 && (
        <div className="gallery-preview">
          <h4>Изображения в галерее:</h4>
          <div className="gallery-items">
            {formData.gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Галерея ${index + 1}`} />
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <h3 className="section-title">Видео</h3>
      
      <div className="form-group">
        <label htmlFor="video">Загрузить видео</label>
        <input
          type="file"
          id="video"
          ref={videoInputRef}
          onChange={handleVideoUpload}
          className="form-control"
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
          disabled={uploadingVideo}
        />
        {errors.video && <div className="error-message">{errors.video}</div>}
        
        {uploadingVideo && (
          <div className="upload-progress">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${uploadProgress}%` }}
                aria-valuenow={uploadProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}
      </div>
      
      {formData.videos.length > 0 && (
        <div className="videos-preview">
          <h4>Загруженные видео:</h4>
          <div className="video-items">
            {renderVideoList()}
          </div>
        </div>
      )}
      
      <div className="form-group form-check">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="featured">
          Избранный проект (отображается на главной странице)
        </label>
      </div>
      
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Сохранение...' : (project ? 'Обновить проект' : 'Создать проект')}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;