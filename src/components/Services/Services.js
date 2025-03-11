import React, { useState, useEffect, useRef } from 'react';
import './Services.css';
import showreelImage from '../../assets/images/coffeepic.png';
import { Link } from 'react-router-dom';

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
      tags: ['SMM стратегия', 'smm продвижение', 'smm ведение', 'smm пакеты', 'контент-стратегия', 'influence-маркетинг']
    },
    {
      id: 2,
      title: 'стратегия и аудит',
      description: 'разберем ваш бренд, проанализируем весь рынок и составим грамотную стратегию продвижения как в социальных сетях, так и за их пределами.',
      tags: ['Маркетинговые исследования и анализ конкурентов', 'Маркетинговый аудит и консультирование', 'Digital стратегия']
    },
    {
      id: 3,
      title: 'digital маркетинг',
      description: 'Продвинем Ваше предприятие не только в социальных сетях! Разработка стратегии, анализ конкурентов и полноценное продвижение в поисковых запросах.',
      tags: ['Google и Яндекс реклама', 'Email-маркетинг', 'Контекстная реклама', 'Оптимизация поисковых систем (SEO)']
    },
    {
      id: 4,
      title: 'дизайн и брендинг',
      description: 'Оперативно и качественно придадим уникальный стиль для фирмы. Поможем стать заметнее и выделиться на фоне конкурентов.',
      tags: ['фирменный стиль', 'Визуальная концепция', 'Дизайн упаковки', 'Графический дизайн', 'Разработка логотипа']
    },
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
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (sectionRef.current) {
  //       const rect = sectionRef.current.getBoundingClientRect();
  //       const imageHeight = sectionRef.current.querySelector('.services-image').offsetHeight;
  //       const scrollThreshold = imageHeight * 0.2; // 80% высоты изображения
        
  //       if (rect.bot < -scrollThreshold) {
  //         setIsScrolled(true);
  //       } else {
  //         setIsScrolled(false);
  //       }
  //     }
  //   };
    
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <section 
      id="services" 
      className={`services ${isScrolled ? 'scrolled' : ''}`}
      ref={sectionRef}
    >
      
      <div className="container">
        <div className="services-content">
          <div className="services-left">
            <h2 className="services-title">
              полный спектр услуг в сфере<br />
              социальных сетей. изучите наши<br />
              услуги и узнайте больше.
            </h2>
            <Link to="/projects" className="services-button">что мы делаем</Link>
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