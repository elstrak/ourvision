// src/pages/AboutPage/AboutPage.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

// Импорт видео
import aboutVideo from '../../assets/videos/about.mp4';

// Импорт изображений команды (для резервного использования)
import girl1 from '../../assets/images/girl1.JPG';
import girl2 from '../../assets/images/girl2.JPG';
import vitya from '../../assets/images/vitya.JPG';
import ivan from '../../assets/images/ivan.JPG';

// Заглушки для партнеров
import partner1 from '../../assets/images/partner1.JPG';
import partner2 from '../../assets/images/partner2.JPG';
import partner3 from '../../assets/images/partner3.PNG';
import partner4 from '../../assets/images/partner4.JPG';
import partner5 from '../../assets/images/partner5.png';
import partner6 from '../../assets/images/partner6.png';
import partner7 from '../../assets/images/partner7.png';

const AboutPage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  
  // Refs для анимированного круга
  const circleRef = useRef(null);
  const textCircle1Ref = useRef(null);
  const textCircle2Ref = useRef(null);
  const textCircle3Ref = useRef(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  // Состояние для хранения данных о команде
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }

    // Параллакс эффект для героя
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Загрузка данных о команде через API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/team');
        setTeamMembers(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке данных о команде:', err);
        setError('Не удалось загрузить данные о команде');
        
        // Используем резервные данные в случае ошибки
        const defaultTeamMembers = [
          {
            id: 1,
            name: 'Валерия',
            position: 'Content-maker',
            image: girl1,
            description: 'Валерия один из сильнейших специалистов в формате производства видео-контента в нашей команде ! Огромный опыт и педантичный подход: это точно про нее.',
            color: '#75ACDD'
          },
          {
            id: 2,
            name: 'Виктор',
            position: 'Founder & CEO',
            image: vitya,
            description: 'Один из основателей агентства. Большой опыт в различных нишах и направлениях, который всегда помогает в развитии соц. сетей наших заказчиков.',
            color: '#E63623'
          },
          {
            id: 3,
            name: 'Иван',
            position: 'Founder & Designer',
            image: ivan,
            description: 'Иван - настоящий гуру в дизайне ! Его основательный подход и креативное мышление упакуют Ваш профиль на все 100%',
            color: '#00A13A'
          },
          {
            id: 4,
            name: 'Ольга',
            position: 'Project Manager',
            image: girl2,
            description: 'Ольга талантливый стратег: составить план продвижения, придумать коллаборации с другими предприятиями, наладить партнерские отношения - для Оли все это не проблема.',
            color: '#F7BFB9'
          }
        ];
        setTeamMembers(defaultTeamMembers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);

  // Анимация для вращающегося круга
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

  // Данные о партнерах
  const partners = [
    { id: 1, name: 'Partner 1', logo: partner1 },
    { id: 2, name: 'Partner 2', logo: partner2 },
    { id: 3, name: 'Partner 3', logo: partner3 },
    { id: 4, name: 'Partner 4', logo: partner4 },
    { id: 5, name: 'Partner 5', logo: partner5 },
    { id: 6, name: 'Partner 6', logo: partner6 },
    { id: 7, name: 'Partner 7', logo: partner7 },
    { id: 8, name: 'Partner 1', logo: partner1 },
    { id: 9, name: 'Partner 2', logo: partner2 },
    { id: 10, name: 'Partner 3', logo: partner3 },
    { id: 11, name: 'Partner 4', logo: partner4 },
    { id: 12, name: 'Partner 5', logo: partner5 },
    { id: 13, name: 'Partner 6', logo: partner6 },
    { id: 14, name: 'Partner 7', logo: partner7 },
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Hero секция с видео */}
      <section className="about-hero-video">
        <div className="video-overlay"></div>
        <video 
          ref={videoRef}
          className={`hero-video ${isVideoLoaded ? 'loaded' : ''}`}
          src={aboutVideo}
          autoPlay
          muted
          loop
          playsInline
        ></video>
        
        <div className="hero-content" ref={heroRef}>
          <h1>наша история</h1>
          <p>создаем бренды, которые говорят с людьми на одном языке</p>
        </div>
      </section>
      
      {/* О компании */}
      <section className="about-company">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-content">
              <h2>кто мы</h2>
              <p>Мы создаем цифровые стратегии там, где рождается креатив — на стыке вулканов и океана.</p>
              <p>Профессионализм аналитики + нешаблонные идеи = контент, который цепляет аудиторию и конвертирует подписчиков в клиентов.</p>
              <p>Изучаем ваш бренд, подбираем точечные решения, усиливаем эмоциями. Никаких шаблонов — только индивидуальный подход и данные в основе.</p>
              <p>Камчатка учит быть смелыми. </p>
              <p>Ваш успех — наша стихия.</p>
              
              <div className="about-stats">
                <div className="stat-item" style={{ backgroundColor: '#E63623', color: '#fff' }}>
                  <span className="stat-number">3+</span>
                  <span className="stat-label">лет опыта</span>
                </div>
                <div className="stat-item" style={{ backgroundColor: '#75ACDD', color: '#fff' }}>
                  <span className="stat-number">40+</span>
                  <span className="stat-label">клиентов</span>
                </div>
                <div className="stat-item" style={{ backgroundColor: '#00A13A', color: '#fff' }}>
                  <span className="stat-number">70+</span>
                  <span className="stat-label">проектов</span>
                </div>
              </div>
            </div>
            
            <div className="about-image-container">
              <div className="about-image-wrapper">
                <div className="about-circle-container">
                  <div className="about-circle" ref={circleRef}>
                    <div className="text-circle text-circle-1" ref={textCircle1Ref}>
                      <svg viewBox="0 0 100 100">
                        <path id="aboutCurve1" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                        <text>
                          <textPath xlinkHref="#aboutCurve1">
                            • SMM • МАРКЕТИНГ • СТРАТЕГИЯ • КОНТЕНТ • ПРОДВИЖЕНИЕ • АНАЛИТИКА • SMM • МАРКЕТИНГ • СТРАТЕГИЯ • КОНТЕНТ • ПРОДВИЖЕНИЕ
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    
                    <div className="text-circle text-circle-2" ref={textCircle2Ref}>
                      <svg viewBox="0 0 100 100">
                        <path id="aboutCurve2" d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="transparent" />
                        <text>
                          <textPath xlinkHref="#aboutCurve2">
                            • ДИЗАЙН • ФОТО • ВИДЕО • АНИМАЦИЯ • КОПИРАЙТИНГ • ПРОДАКШН • ДИЗАЙН • ФОТО • ВИДЕО • АНИМАЦИЯ
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    
                    <div className="text-circle text-circle-3" ref={textCircle3Ref}>
                      <svg viewBox="0 0 100 100">
                        <path id="aboutCurve3" d="M 50, 50 m -20, 0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" fill="transparent" />
                        <text>
                          <textPath xlinkHref="#aboutCurve3">
                            • С 2022 • КАМЧАТКА • ПЕТРОПАВЛОВСК-КАМЧАТСКИЙ
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Миссия и ценности */}
      <section className="about-mission">
        <div className="about-container">
          <h2>наша миссия и ценности</h2>
          <div className="mission-content">
            <div className="mission-statement">
              <h3>миссия</h3>
              <p>Помогать бизнесу расти и развиваться через инновационные маркетинговые решения, создавая ценность для клиентов и их аудитории.</p>
              <div className="mission-shape"></div>
            </div>
            <div className="values-list">
              <h3>ценности</h3>
              <ul>
                <li style={{ borderLeft: '4px solid #E63623' }}>
                  <strong>Инновации</strong>
                  <p>Мы постоянно ищем новые подходы и технологии для решения задач наших клиентов.</p>
                </li>
                <li style={{ borderLeft: '4px solid #75ACDD' }}>
                  <strong>Качество</strong>
                  <p>Мы стремимся к совершенству в каждом проекте и уделяем внимание каждой детали.</p>
                </li>
                <li style={{ borderLeft: '4px solid #00A13A' }}>
                  <strong>Партнерство</strong>
                  <p>Мы строим долгосрочные отношения с клиентами, основанные на доверии и взаимном уважении.</p>
                </li>
                <li style={{ borderLeft: '4px solid #F7BFB9' }}>
                  <strong>Результат</strong>
                  <p>Мы ориентированы на достижение измеримых результатов для бизнеса наших клиентов.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Команда */}
      <section className="about-team">
        <div className="about-container">
          <h2>наша команда</h2>
          <p className="team-intro">Познакомьтесь с профессионалами, которые делают нашу компанию особенной</p>
          
          {loading ? (
            <div className="loading-indicator">Загрузка данных о команде...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <div className="team-grid">
              {teamMembers.map(member => (
                <div key={member.id} className="team-member">
                  <div className="member-image">
                    <img src={member.image} alt={member.name} />
                    <div className="member-color-bar" style={{ backgroundColor: member.color }}></div>
                  </div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <span className="member-position" style={{ color: member.color }}>{member.position}</span>
                    <p>{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Партнеры */}
      <section className="about-partners">
        <div className="about-container">
          <h2>наши партнеры</h2>
          <p>Мы гордимся сотрудничеством с ведущими компаниями в различных отраслях</p>
        </div>
        
        <div className="partners-marquee">
          <div className="marquee-content">
            {partners.map(partner => (
              <div key={partner.id} className="partner-item">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA секция */}
      <section className="about-cta">
        <div className="about-container">
          <div className="cta-content">
            <h2>готовы начать сотрудничество?</h2>
            <p>Свяжитесь с нами, чтобы обсудить ваш проект и узнать, как мы можем помочь вашему бизнесу</p>
            <Link to="/contact" className="cta-button">связаться с нами</Link>
          </div>
          <div className="cta-shapes">
            <div className="cta-shape shape-circle" style={{ backgroundColor: '#FF4D4F' }}></div>
            <div className="cta-shape shape-square" style={{ backgroundColor: '#1890FF' }}></div>
            <div className="cta-shape shape-triangle" style={{ backgroundColor: '#52C41A' }}></div>
            <div className="cta-shape shape-pentagon" style={{ backgroundColor: '#F759AB' }}></div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;