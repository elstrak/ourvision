import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import arrowIcon from '../../assets/images/arrow-icon.svg';

const Hero = () => {
  const circleRef = useRef(null);
  const textCircle1Ref = useRef(null);
  const textCircle2Ref = useRef(null);
  const textCircle3Ref = useRef(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Постоянная анимация кругов
  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now();
    const animationDuration = 8000; // 8 секунд на полный цикл анимации
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = (elapsedTime % animationDuration) / animationDuration;
      
      // Определяем фазу анимации (0-0.5: по часовой, 0.5-1: против часовой)
      const phase = progress < 0.5 ? 0 : 1;
      
      if (phase !== animationPhase) {
        setAnimationPhase(phase);
      }
      
      if (circleRef.current && textCircle1Ref.current && textCircle2Ref.current && textCircle3Ref.current) {
        // Вращение основного круга
        const baseRotation = progress < 0.5 
          ? progress * 2 * 20 // 0-20 градусов в первой фазе
          : (1 - (progress - 0.5) * 2) * 20; // 20-0 градусов во второй фазе
        
        circleRef.current.style.transform = `rotate(${baseRotation}deg)`;
        
        if (phase === 0) {
          // Фаза 1: блюрятся 1 и 3 секторы, вращение по часовой
          const normalizedProgress = progress * 2; // 0-1 в первой фазе
          
          textCircle1Ref.current.style.transform = `rotate(${normalizedProgress * 15}deg)`;
          textCircle1Ref.current.style.filter = `blur(${normalizedProgress * 1.5}px)`;
          
          textCircle2Ref.current.style.transform = `rotate(${-normalizedProgress * 18}deg)`;
          textCircle2Ref.current.style.filter = 'blur(0px)';
          
          textCircle3Ref.current.style.transform = `rotate(${normalizedProgress * 12}deg)`;
          textCircle3Ref.current.style.filter = `blur(${normalizedProgress * 1.5}px)`;
        } else {
          // Фаза 2: блюрится 2 сектор, вращение против часовой
          const normalizedProgress = (progress - 0.5) * 2; // 0-1 во второй фазе
          
          textCircle1Ref.current.style.transform = `rotate(${15 - normalizedProgress * 15}deg)`;
          textCircle1Ref.current.style.filter = `blur(${1.5 - normalizedProgress * 1.5}px)`;
          
          textCircle2Ref.current.style.transform = `rotate(${-18 + normalizedProgress * 18}deg)`;
          textCircle2Ref.current.style.filter = `blur(${normalizedProgress * 1.5}px)`;
          
          textCircle3Ref.current.style.transform = `rotate(${12 - normalizedProgress * 12}deg)`;
          textCircle3Ref.current.style.filter = `blur(${1.5 - normalizedProgress * 1.5}px)`;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationPhase]);
  
  // Обработчик клика по кнопке "Оставить заявку"
  const handleContactClick = () => {
    window.location.href = '/brief';
  };
  
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      
      <div className="hero-circle-container">
        <div className="hero-circle" ref={circleRef}>
          <div className="text-circle text-circle-1" ref={textCircle1Ref}>
            <svg viewBox="0 0 100 100">
              <path id="curve1" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
              <text>
                <textPath xlinkHref="#curve1">
                  • OURVISION • CREATIVE AGENCY • SOCIAL MEDIA • CONTENT • STRATEGY • PRODUCTION
                </textPath>
              </text>
            </svg>
          </div>
          
          <div className="text-circle text-circle-2" ref={textCircle2Ref}>
            <svg viewBox="0 0 100 100">
              <path id="curve2" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="transparent" />
              <text>
                <textPath xlinkHref="#curve2">
                  • DESIGN • PHOTO • VIDEO • ANIMATION • COPYWRITING • PRODUCTION
                </textPath>
              </text>
            </svg>
          </div>
          
          <div className="text-circle text-circle-3" ref={textCircle3Ref}>
            <svg viewBox="0 0 100 100">
              <path id="curve3" d="M 50, 50 m -20, 0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" fill="transparent" />
              <text>
                <textPath xlinkHref="#curve3">
                  • SINCE 2023 • MOSCOW • SAINT PETERSBURG
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="container hero-container">
        <h1 className="hero-title">
          smm-агентство<br />
          для ведущих брендов.
        </h1>
        
        <div className="hero-scroll">
          <button onClick={handleContactClick} className="contact-button">
            оставить заявку
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;