import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import aboutVideo from '../../assets/videos/about.mp4';
import { Link } from 'react-router-dom';

const About = () => {
  const sectionRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const titleHeight = sectionRef.current.querySelector('.about-title').offsetHeight;
        
        // Если проскроллили ниже заголовка
        if (sectionTop > 0 && Math.abs(sectionTop) > titleHeight) {
          setIsScrolled(false);
        } else {
          setIsScrolled(true);
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
      id="about" 
      className={`about ${isScrolled ? 'scrolled' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <h2 className="about-title">мы делаем<br />бренды человечнее.</h2>
        
        <div className="abouthome-content">
          <div className="about-video-container">
            <video 
              className="about-video"
              src={aboutVideo}
              autoPlay
              muted
              loop
              playsInline
            ></video>
          </div>
          
          <div className="about-text-container">
            <div className="abouthome-text-wrapper">
              <p className="about-text">
                мы — smm-агентство, которое превращает
              </p>
              <p className="about-text">
                бренды в социальные иконы.
              </p>
              <p className="about-text">
               мы создаем прочные связи и стимулируем
              </p>
              <p className="about-text">
                вовлеченность. наш подход основан на глубоком понимании
              </p>
              <p className="about-text">
                аудитории и современных трендов цифрового пространства.
              </p>
            </div>
            
            <Link to="/about" className="about-button">о нас</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
