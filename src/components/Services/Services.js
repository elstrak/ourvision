import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import showreelImage from '../../assets/images/showreel.jpg';

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionRef = useRef(null);
  
  // Данные о сервисах
  const services = [
    {
      id: 1,
      title: 'маркетинг в социальных сетях',
      description: 'продвигаем ваш продукт в соцсетях: не просто пишем посты и делаем картинки, а выстраиваем стратегию продвижения, придумываем визуальное оформление, составляем контент-план и разрабатываем ToV (tone of voice) для общения с аудиторией.',
      tags: ['SMM стратегия', 'анализ конкурентов', 'позиционирование', 'целевая аудитория']
    },
    {
      id: 2,
      title: 'стратегия и аудит',
      description: 'разберем ваш бренд, проанализируем весь рынок и составим грамотную стратегию продвижения как в социальных сетях, так и за их пределами.',
      tags: ['дизайн', 'фото', 'видео', 'анимация', 'копирайтинг']
    },
    {
      id: 3,
      title: 'studio',
      description: 'Полный цикл производства контента: от идеи до реализации в нашей собственной студии.',
      tags: ['фотосъемка', 'видеопроизводство', 'монтаж', 'постпродакшн']
    },
    {
      id: 4,
      title: 'media',
      description: 'Размещение и продвижение контента на различных платформах для максимального охвата.',
      tags: ['SMM', 'таргетированная реклама', 'контент-план', 'аналитика']
    },
    {
      id: 5,
      title: 'management',
      description: 'Комплексное управление присутствием бренда в социальных сетях и коммуникация с аудиторией.',
      tags: ['комьюнити-менеджмент', 'репутация', 'модерация', 'обратная связь']
    },
    {
      id: 6,
      title: 'influencers',
      description: 'Сотрудничество с лидерами мнений и интеграция бренда в их контент.',
      tags: ['инфлюенсер-маркетинг', 'амбассадоры', 'коллаборации', 'UGC']
    },
    {
      id: 7,
      title: 'data',
      description: 'Сбор и анализ данных для оптимизации стратегии и повышения эффективности кампаний.',
      tags: ['аналитика', 'отчетность', 'A/B тестирование', 'оптимизация']
    }
  ];

  // Обработчик клика по сервису
  const toggleService = (id) => {
    if (activeService === id) {
      setActiveService(null);
    } else {
      setActiveService(id);
    }
  };

  // Отслеживание скролла для изменения цвета фона
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const imageHeight = sectionRef.current.querySelector('.services-image').offsetHeight;
        const scrollThreshold = imageHeight * 0.2; // 80% высоты изображения
        
        if (rect.bot < -scrollThreshold) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="services" 
      className={`services ${isScrolled ? 'scrolled' : ''}`}
      ref={sectionRef}
    >
      <div className="services-image-container">
        <img src={showreelImage} alt="Showreel" className="services-image" />
      </div>
      
      <div className="container">
        <div className="services-content">
          <div className="services-left">
            <h2 className="services-title">
              a full-service social media agency,<br />
              mastering the art of social data<br />
              driven strategies and delivering<br />
              effective solutions for leading<br />
              brands. explore our services and<br />
              discover more.
            </h2>
            <a href="#what-we-do" className="services-button">what we do</a>
          </div>
          
          <div className="services-right">
            <ul className="services-list">
              {services.map((service) => (
                <li 
                  key={service.id} 
                  className={`service-item ${activeService === service.id ? 'active' : ''}`}
                >
                  <div 
                    className="service-header"
                    onClick={() => toggleService(service.id)}
                  >
                    <h3 className="service-title">{service.title}</h3>
                    <span className="service-toggle">
                      {activeService === service.id ? '−' : '+'}
                    </span>
                  </div>
                  
                  <div className="service-details">
                    <p className="service-description">{service.description}</p>
                    <div className="service-tags">
                      {service.tags.map((tag, index) => (
                        <span key={index} className="service-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;