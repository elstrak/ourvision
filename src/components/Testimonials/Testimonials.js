// src/components/Testimonials/Testimonials.js
import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const testimonialsRef = useRef(null);

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Анна Смирнова',
      position: 'Директор по маркетингу, TechVision',
      text: 'Сотрудничество с этой командой полностью преобразило наше присутствие в социальных сетях. За 3 месяца мы увеличили вовлеченность на 78% и привлекли более 10,000 новых подписчиков. Их стратегический подход и креативные решения действительно выделяются на рынке.',
      color: '#4285F4', // Blue
      shape: 'testimonial-shape-circle'
    },
    {
      id: 2,
      name: 'Дмитрий Волков',
      position: 'Основатель, EcoStyle',
      text: 'Мы обратились к команде, когда запускали новую линейку продуктов. Благодаря их экспертизе в социальных медиа, мы смогли создать настоящий ажиотаж вокруг запуска. Результаты превзошли все ожидания — ROI кампании составил более 300%.',
      color: '#FBBC05', // Yellow
      shape: 'testimonial-shape-square'
    },
    {
      id: 3,
      name: 'Елена Петрова',
      position: 'CEO, Beauty Brand',
      text: 'Профессионализм и креативность этой команды помогли нам выстроить уникальную идентичность бренда в социальных сетях. Особенно впечатляет их способность адаптироваться к меняющимся трендам и алгоритмам платформ, сохраняя при этом аутентичность нашего бренда.',
      color: '#34A853', // Green
      shape: 'testimonial-shape-hexagon'
    },
    {
      id: 4,
      name: 'Сергей Иванов',
      position: 'Директор по развитию, FoodMarket',
      text: 'Работа с этой командой — это не просто делегирование SMM, а настоящее стратегическое партнерство. Они глубоко погрузились в специфику нашего бизнеса и предложили решения, которые действительно работают. За год сотрудничества наши продажи через социальные сети выросли на 125%.',
      color: '#EA4335', // Red
      shape: 'testimonial-shape-pentagon'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (testimonialsRef.current) {
        const rect = testimonialsRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        
        if (isVisible) {
          testimonialsRef.current.classList.add('visible');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="testimonials" ref={testimonialsRef}>
      <div className="container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">отзывы клиентов</h2>
          <p className="testimonials-subtitle">
            Что говорят о нас те, кто уже доверил нам свои социальные сети
          </p>
        </div>
        
        <div className="testimonials-content">
          <div className="testimonials-left">
            <div className="testimonials-intro">
              <div className="testimonials-stat">97%</div>
              <div className="testimonials-stat-text">клиентов продолжают сотрудничество после первого проекта</div>
              <div className="testimonials-quote">
                Мы строим долгосрочные отношения, основанные на результатах и доверии.
              </div>
            </div>
          </div>
          
          <div className="testimonials-right">
            <div 
              className="testimonials-carousel"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-item ${index === activeTestimonial ? 'active' : ''}`}
                >
                  <div 
                    className={`testimonial-shape ${testimonial.shape}`}
                    style={{ backgroundColor: testimonial.color }}
                  ></div>
                  
                  <div className="testimonial-content">
                    <div className="testimonial-text">{testimonial.text}</div>
                    <div className="testimonial-author">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-position">{testimonial.position}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonial-controls">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  className={`testimonial-dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;