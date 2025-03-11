// src/components/testimonials/TestimonialDisplay.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TestimonialDisplay.css';

const TestimonialDisplay = ({ projectId }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectInfo, setProjectInfo] = useState(null);

  // Загрузка отзывов
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects/${projectId}/testimonials`);
        setTestimonials(res.data.data);
        
        // Получаем информацию о проекте
        if (projectId) {
          const projectRes = await axios.get(`/api/projects/${projectId}`);
          setProjectInfo(projectRes.data.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке отзывов:', err);
        setError('Не удалось загрузить отзывы');
        setLoading(false);
      }
    };

    if (projectId) {
      fetchTestimonials();
    }
  }, [projectId]);

  // Переключение на следующий отзыв
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Переключение на предыдущий отзыв
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Автоматическое переключение отзывов каждые 5 секунд
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading) {
    return <div className="testimonial-display-loading">Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className="testimonial-display-error">{error}</div>;
  }

  if (testimonials.length === 0) {
    return null; // Не показываем блок, если отзывов нет
  }

  return (
    <div className="testimonial-display">
      <h2 className="testimonial-display-title">Отзывы наших клиентов</h2>
      
      <div className="testimonial-carousel">
        <button 
          className="testimonial-nav prev" 
          onClick={prevTestimonial}
          aria-label="Предыдущий отзыв"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="testimonial-card">
          <div className="testimonial-quote-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 11H6C4.89543 11 4 10.1046 4 9V7C4 5.89543 4.89543 5 6 5H8C9.10457 5 10 5.89543 10 7V15C10 16.1046 9.10457 17 8 17H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 11H16C14.8954 11 14 10.1046 14 9V7C14 5.89543 14.8954 5 16 5H18C19.1046 5 20 5.89543 20 7V15C20 16.1046 19.1046 17 18 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="testimonial-content">
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            
            <div className="testimonial-footer">
              <div className="testimonial-author">{testimonials[currentIndex].contactInfo}</div>
              
              {projectInfo && (
                <div className="testimonial-project">
                  Проект: {' '}
                  <Link to={`/projects/${projectId}`} className="project-link">
                    {projectInfo.title}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button 
          className="testimonial-nav next" 
          onClick={nextTestimonial}
          aria-label="Следующий отзыв"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="testimonial-indicators">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`testimonial-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Перейти к отзыву ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialDisplay;