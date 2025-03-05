import React, { useRef, useState, useEffect } from 'react';
import './Partners.css';
// Импортируйте видеофайлы, если они находятся в src
import video1 from '../../assets/videos/video1.mp4';
import video2 from '../../assets/videos/video2.mp4';
import video3 from '../../assets/videos/video3.mp4';
import video4 from '../../assets/videos/video4.mp4';
import video5 from '../../assets/videos/video5.mp4';

const Partners = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  
  // Пример данных о партнерах с правильными путями
  const partners = [
    { id: 1, name: 'Сбербанк', videoSrc: video1 },
    { id: 2, name: 'Газпром', videoSrc: video2 },
    { id: 3, name: 'Яндекс', videoSrc: video3 },
    { id: 4, name: 'МТС', videoSrc: video4 },
    { id: 5, name: 'Мегафон', videoSrc: video5 },
    // { id: 6, name: 'Билайн', videoSrc: '/videos/partner6.mp4' },
    // { id: 7, name: 'Альфа-Банк', videoSrc: '/videos/partner7.mp4' },
    // { id: 8, name: 'ВТБ', videoSrc: '/videos/partner8.mp4' },
    // { id: 9, name: 'Тинькофф', videoSrc: '/videos/partner9.mp4' },
    // { id: 10, name: 'Ростелеком', videoSrc: '/videos/partner10.mp4' },
    // { id: 11, name: 'Аэрофлот', videoSrc: '/videos/partner11.mp4' },
    // { id: 12, name: 'РЖД', videoSrc: '/videos/partner12.mp4' },
  ];

  // Обработчики для drag'n'scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Скорость скролла
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Проверка возможности скролла влево
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 0);
    }
  };

  // Обработчики для видео
  const handleVideoHover = (id) => {
    setActiveVideo(id);
    const video = document.getElementById(`video-${id}`);
    if (video) {
      video.play();
    }
  };

  const handleVideoLeave = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setActiveVideo(null);
  };

  // Обработчики для кнопок навигации
  const scrollLeftHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRightHandler = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  // Очистка обработчиков при размонтировании
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    const handleMouseLeave = () => {
      setIsDragging(false);
    };
    
    const handleScroll = () => {
      checkScrollPosition();
    };
    
    if (scrollContainer) {
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('scroll', handleScroll);
      // Проверяем начальное положение
      checkScrollPosition();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="partners" className="partners">
      <div className="container">
        <h2 className="partners-title">как мы умеем</h2>
        
        <div 
          className="partners-scroll-container" 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {partners.map((partner) => (
            <div className="partner-card" key={partner.id}>
              <div 
                className="video-container"
                onMouseEnter={() => handleVideoHover(partner.id)}
                onMouseLeave={() => handleVideoLeave(partner.id)}
              >
                <video 
                  id={`video-${partner.id}`}
                  className="partner-video"
                  src={partner.videoSrc}
                  muted
                  playsInline
                  loop
                ></video>
                <div className="video-overlay"></div>
              </div>
              <div className="partner-name">{partner.name}</div>
            </div>
          ))}
        </div>
        
        <div className="partners-navigation">
          <div className="slider-nav">
            <button 
              className={`nav-button prev ${canScrollLeft ? 'active' : ''}`} 
              onClick={scrollLeftHandler}
              disabled={!canScrollLeft}
            >
              &lt;
            </button>
            <button className="nav-button next" onClick={scrollRightHandler}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;