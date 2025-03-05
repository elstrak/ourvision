import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import './WorkPage.css';
// Импортируем те же видео, что и в Partners
import video1 from '../../assets/videos/video1.mp4';
import video2 from '../../assets/videos/video2.mp4';
import video3 from '../../assets/videos/video3.mp4';
import video4 from '../../assets/videos/video4.mp4';
import video5 from '../../assets/videos/video5.mp4';

const WorkPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const headerRef = useRef(null);
  const workItemsRef = useRef([]);
  
  // Данные о проектах
  const projects = [
    { id: 1, name: 'Сбербанк', videoSrc: video1, color: '#21A038' },
    { id: 2, name: 'Газпром', videoSrc: video2, color: '#0078C1' },
    { id: 3, name: 'Яндекс', videoSrc: video3, color: '#FF0000' },
    { id: 4, name: 'МТС', videoSrc: video4, color: '#E30611' },
    { id: 5, name: 'Мегафон', videoSrc: video5, color: '#00B956' },
  ];
  
  // Отслеживаем скролл
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Анимация элементов при скролле
  useEffect(() => {
    if (workItemsRef.current.length > 0) {
      workItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          // Добавляем класс с задержкой в зависимости от индекса
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150);
        }
      });
    }
  }, [scrollY]);
  
  // Обработчики для видео
  const handleVideoHover = (id) => {
    const video = document.getElementById(`work-video-${id}`);
    if (video) {
      video.play();
    }
  };
  
  const handleVideoLeave = (id) => {
    const video = document.getElementById(`work-video-${id}`);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };
  
  return (
    <div className="work-page">
      <Header ref={headerRef} />
      
      <main className="work-page-content">
        <section className="work-hero">
          <div className="container">
            <h1 className="work-title">
              мы не можем показать<br />
              все, но вот некоторые<br />
              из наших партнеров<br />
              в социальных медиа.
            </h1>
            
            <div className="scroll-indicator">
              <button className="scroll-button">скролл вниз</button>
            </div>
          </div>
        </section>
        
        <section className="work-projects">
          <div className="container">
            <div className="work-grid">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="work-item"
                  ref={el => workItemsRef.current[index] = el}
                >
                  <div className="work-item-inner">
                    <div 
                      className="work-circle"
                      style={{ backgroundColor: project.color }}
                    ></div>
                    
                    <div 
                      className="work-card"
                      style={{ backgroundColor: project.color }}
                    >
                      <div 
                        className="work-video-container"
                        onMouseEnter={() => handleVideoHover(project.id)}
                        onMouseLeave={() => handleVideoLeave(project.id)}
                      >
                        <video 
                          id={`work-video-${project.id}`}
                          className="work-video"
                          src={project.videoSrc}
                          muted
                          playsInline
                          loop
                        ></video>
                        <div className="work-video-overlay"></div>
                      </div>
                      <div className="work-project-name">{project.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkPage;