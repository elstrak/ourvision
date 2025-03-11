// src/components/testimonials/AllTestimonials.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TestimonialDisplay.css';

const AllTestimonials = () => {
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsInfo, setProjectsInfo] = useState({});

  // Загрузка всех проектов и их отзывов
  useEffect(() => {
    const fetchAllTestimonials = async () => {
      try {
        setLoading(true);
        
        // Сначала получаем все проекты
        const projectsRes = await axios.get('/api/projects');
        const projects = projectsRes.data.data;
        
        // Создаем объект с информацией о проектах для быстрого доступа
        const projectsInfoObj = {};
        projects.forEach(project => {
          projectsInfoObj[project._id] = project;
        });
        setProjectsInfo(projectsInfoObj);
        
        // Затем получаем отзывы для каждого проекта
        const allTestimonialsArray = [];
        
        for (const project of projects) {
          try {
            const testimonialRes = await axios.get(`/api/projects/${project._id}/testimonials`);
            const projectTestimonials = testimonialRes.data.data;
            
            // Добавляем информацию о проекте к каждому отзыву
            const testimonials = projectTestimonials.map(testimonial => ({
              ...testimonial,
              projectId: project._id,
              projectTitle: project.title
            }));
            
            allTestimonialsArray.push(...testimonials);
          } catch (err) {
            console.error(`Ошибка при загрузке отзывов для проекта ${project._id}:`, err);
          }
        }
        
        setAllTestimonials(allTestimonialsArray);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке отзывов:', err);
        setError('Не удалось загрузить отзывы');
        setLoading(false);
      }
    };

    fetchAllTestimonials();
  }, []);

  // Переключение на следующий отзыв
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === allTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Переключение на предыдущий отзыв
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allTestimonials.length - 1 : prevIndex - 1
    );
  };

  // Автоматическое переключение отзывов
  useEffect(() => {
    if (allTestimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allTestimonials.length]);

  if (loading) {
    return <div className="testimonial-display-loading">Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className="testimonial-display-error">{error}</div>;
  }

  if (allTestimonials.length === 0) {
    return null;
  }

  const currentTestimonial = allTestimonials[currentIndex];

  return (
    <div className="testimonial-display">
      <h2 className="testimonial-display-title">отзывы наших клиентов</h2>
      
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
            <p className="testimonial-text">{currentTestimonial.text}</p>
            
            <div className="testimonial-footer">
              <div className="testimonial-author">{currentTestimonial.contactInfo}</div>
              
              {currentTestimonial.projectId && (
                <div className="testimonial-project">
                  Проект: {' '}
                  <Link to={`/projects/${currentTestimonial.projectId}`} className="project-link">
                    {currentTestimonial.projectTitle}
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
        {allTestimonials.map((_, index) => (
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

export default AllTestimonials;