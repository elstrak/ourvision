import React, { useRef, useState, useEffect } from 'react';
import './Partners.css';
// Импортируйте видеофайлы, если они находятся в src
import video1 from '../../assets/videos/video1.MP4';
import video2 from '../../assets/videos/video2.MP4';
import video3 from '../../assets/videos/video3.MP4';
import video4 from '../../assets/videos/video4.MP4';
import video5 from '../../assets/videos/video5.MP4';
import video6 from '../../assets/videos/video6.mp4';
import video7 from '../../assets/videos/video7.mp4';
import video8 from '../../assets/videos/video8.mp4';
import video9 from '../../assets/videos/video9.mp4';
import video10 from '../../assets/videos/video10.mp4';
import video11 from '../../assets/videos/video11.mp4';
import video12 from '../../assets/videos/video12.mp4';
import video13 from '../../assets/videos/video13.mp4';
import video14 from '../../assets/videos/video14.mp4';

const Partners = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  
  // Пример данных о партнерах с правильными путями
  const partners = [
    { id: 1, name: 'Lavasia', videoSrc: video1 },
    { id: 2, name: 'Da Vinci', videoSrc: video2 },
    { id: 3, name: 'Винотека "Клевер"', videoSrc: video3 },
    { id: 4, name: 'Барбершоп Brics', videoSrc: video4 },
    { id: 5, name: 'Ля’Шеф', videoSrc: video5 },
    { id: 6, name: 'Терраса Гриль', videoSrc: video6 },
    { id: 7, name: 'Винотека "Клевер"', videoSrc: video14 },
    { id: 8, name: 'Ля’Шеф', videoSrc: video7 },
    { id: 9, name: 'Барбершоп Brics', videoSrc: video8 },
    { id: 10, name: 'Da Vinci', videoSrc: video9 },
    { id: 11, name: 'Lavasia', videoSrc: video10 },
    { id: 12, name: 'Камгазблок', videoSrc: video11 },
    { id: 13, name: 'Камгазблок', videoSrc: video12 },
    { id: 14, name: 'Камгазблок', videoSrc: video13 },
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
      // Добавляем проверку, чтобы избежать конфликтов воспроизведения
      const playPromise = video.play();
      
      // Обрабатываем promise, возвращаемый методом play()
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Воспроизведение успешно началось
        })
        .catch(error => {
          // Автовоспроизведение было предотвращено
          console.log("Воспроизведение было предотвращено:", error);
        });
      }
    }
  };

  const handleVideoLeave = (id) => {
    const video = document.getElementById(`video-${id}`);
    if (video) {
      // Добавляем проверку, чтобы избежать конфликтов воспроизведения/паузы
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Воспроизведение успешно началось, теперь можно безопасно поставить на паузу
          video.pause();
          video.currentTime = 0;
        })
        .catch(error => {
          // Автовоспроизведение было предотвращено, но мы все равно можем сбросить время
          video.currentTime = 0;
        });
      } else {
        // Для старых браузеров, которые не возвращают promise
        video.pause();
        video.currentTime = 0;
      }
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