import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialForm from './TestimonialForm';
import Modal from '../Modal/Modal';
import './TestimonialList.css';

const TestimonialList = ({ projectId }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [projects, setProjects] = useState({});
  
  // Загрузка отзывов
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/projects/${projectId}/testimonials`);
      setTestimonials(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при загрузке отзывов:', err);
      setError('Не удалось загрузить отзывы');
      setLoading(false);
    }
  };
  
  // Загрузка информации о связанных проектах
  const fetchRelatedProjects = async (testimonials) => {
    const projectIds = testimonials
      .filter(t => t.relatedProjectId)
      .map(t => t.relatedProjectId);
    
    // Удаляем дубликаты
    const uniqueProjectIds = [...new Set(projectIds)];
    
    if (uniqueProjectIds.length === 0) return;
    
    try {
      const projectsData = {};
      
      // Загружаем информацию о каждом проекте
      for (const id of uniqueProjectIds) {
        const res = await axios.get(`/api/projects/${id}`);
        projectsData[id] = res.data.data;
      }
      
      setProjects(projectsData);
    } catch (err) {
      console.error('Ошибка при загрузке связанных проектов:', err);
    }
  };
  
  useEffect(() => {
    fetchTestimonials();
  }, [projectId]);
  
  useEffect(() => {
    if (testimonials.length > 0) {
      fetchRelatedProjects(testimonials);
    }
  }, [testimonials]);
  
  // Открытие модального окна для добавления/редактирования отзыва
  const handleOpenModal = (testimonial = null) => {
    setCurrentTestimonial(testimonial);
    setIsModalOpen(true);
  };
  
  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTestimonial(null);
  };
  
  // Сохранение отзыва
  const handleSaveTestimonial = async (savedTestimonial) => {
    handleCloseModal();
    await fetchTestimonials();
  };
  
  // Удаление отзыва
  const handleDeleteTestimonial = async (testimonialId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот отзыв?')) {
      return;
    }
    
    try {
      await axios.delete(`/api/projects/${projectId}/testimonials/${testimonialId}`);
      await fetchTestimonials();
    } catch (err) {
      console.error('Ошибка при удалении отзыва:', err);
      alert('Не удалось удалить отзыв');
    }
  };
  
  if (loading) {
    return <div className="testimonial-loading">Загрузка отзывов...</div>;
  }
  
  if (error) {
    return <div className="testimonial-error">{error}</div>;
  }
  
  return (
    <div className="testimonial-list-container">
      <div className="testimonial-list-header">
        <h3>Отзывы о проекте</h3>
        <button 
          className="btn btn-primary" 
          onClick={() => handleOpenModal()}
        >
          Добавить отзыв
        </button>
      </div>
      
      {testimonials.length === 0 ? (
        <div className="testimonial-empty">
          Отзывы отсутствуют. Добавьте первый отзыв!
        </div>
      ) : (
        <div className="testimonial-list">
          {testimonials.map(testimonial => (
            <div key={testimonial._id} className="testimonial-item">
              <div className="testimonial-content">
                <div className="testimonial-text">{testimonial.text}</div>
                <div className="testimonial-contact">{testimonial.contactInfo}</div>
                
                {testimonial.relatedProjectId && projects[testimonial.relatedProjectId] && (
                  <div className="testimonial-related-project">
                    Связанный проект: {projects[testimonial.relatedProjectId].title}
                  </div>
                )}
              </div>
              
              <div className="testimonial-actions">
                <button 
                  className="btn-edit" 
                  onClick={() => handleOpenModal(testimonial)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDeleteTestimonial(testimonial._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={currentTestimonial ? 'Редактировать отзыв' : 'Добавить отзыв'}
      >
        <TestimonialForm 
          projectId={projectId}
          testimonial={currentTestimonial}
          onSave={handleSaveTestimonial}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default TestimonialList;