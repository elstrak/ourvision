import React, { useEffect, useRef, useState } from 'react';
import './Trends.css';

const TrendItem = ({ trend, isHovered, onHover }) => {
  const circleRef = useRef(null);
  const textCircle1Ref = useRef(null);
  const textCircle2Ref = useRef(null);
  const textCircle3Ref = useRef(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animation for the circles
  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now();
    const animationDuration = 8000; // 8 seconds for a full animation cycle
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = (elapsedTime % animationDuration) / animationDuration;
      
      // Determine animation phase (0-0.5: clockwise, 0.5-1: counter-clockwise)
      const phase = progress < 0.5 ? 0 : 1;
      
      if (phase !== animationPhase) {
        setAnimationPhase(phase);
      }
      
      if (circleRef.current && textCircle1Ref.current && textCircle2Ref.current && textCircle3Ref.current) {
        // Main circle rotation
        const baseRotation = progress < 0.5 
          ? progress * 2 * 20 // 0-20 degrees in first phase
          : (1 - (progress - 0.5) * 2) * 20; // 20-0 degrees in second phase
        
        circleRef.current.style.transform = `rotate(${baseRotation}deg)`;
        
        if (phase === 0) {
          // Phase 1: blur circles 1 and 3, clockwise rotation
          const normalizedProgress = progress * 2; // 0-1 in first phase
          
          textCircle1Ref.current.style.transform = `rotate(${normalizedProgress * 15}deg)`;
          textCircle1Ref.current.style.filter = `blur(${normalizedProgress * 1.5}px)`;
          
          textCircle2Ref.current.style.transform = `rotate(${-normalizedProgress * 18}deg)`;
          textCircle2Ref.current.style.filter = 'blur(0px)';
          
          textCircle3Ref.current.style.transform = `rotate(${normalizedProgress * 12}deg)`;
          textCircle3Ref.current.style.filter = `blur(${normalizedProgress * 1.5}px)`;
        } else {
          // Phase 2: blur circle 2, counter-clockwise rotation
          const normalizedProgress = (progress - 0.5) * 2; // 0-1 in second phase
          
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

  return (
    <div 
      className={`trend-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => onHover(trend.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className="trend-shape trend-shape-square" 
        style={{ backgroundColor: trend.color }}
      >
        <div className="trend-circle-container">
          <div className="trend-circle" ref={circleRef}>
            <div className="trend-text-circle trend-text-circle-1" ref={textCircle1Ref}>
              <svg viewBox="0 0 100 100">
                <path id={`curve1-${trend.id}`} d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                <text>
                  <textPath xlinkHref={`#curve1-${trend.id}`}>
                    {trend.circleTexts.outer}
                  </textPath>
                </text>
              </svg>
            </div>
            
            <div className="trend-text-circle trend-text-circle-2" ref={textCircle2Ref}>
              <svg viewBox="0 0 100 100">
                <path id={`curve2-${trend.id}`} d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="transparent" />
                <text>
                  <textPath xlinkHref={`#curve2-${trend.id}`}>
                    {trend.circleTexts.middle}
                  </textPath>
                </text>
              </svg>
            </div>
            
            <div className="trend-text-circle trend-text-circle-3" ref={textCircle3Ref}>
              <svg viewBox="0 0 100 100">
                <path id={`curve3-${trend.id}`} d="M 50, 50 m -20, 0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0" fill="transparent" />
                <text>
                  <textPath xlinkHref={`#curve3-${trend.id}`}>
                    {trend.circleTexts.inner}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="trend-content">
        <div className="trend-date">{trend.date}</div>
        <h3 className="trend-title">{trend.title}</h3>
      </div>
    </div>
  );
};

const Trends = () => {
  const [hoveredTrend, setHoveredTrend] = useState(null);
  
  // Updated trends data with more text to fill the entire circle
  const trends = [
    {
      id: 1,
      title: "meta's new ai content disclosure tag: what it means for socials",
      date: "11 February 2025",
      color: '#E53935', // Red
      textColor: '#FFFFFF',
      circleTexts: {
        outer: "• AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES • AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES • AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES •",
        middle: "• ALGORITHM • SOCIAL MEDIA • CONTENT POLICY • REGULATION • CREATORS • BRANDS • MARKETING • STRATEGY • ALGORITHM • SOCIAL MEDIA • CONTENT POLICY • REGULATION • CREATORS • BRANDS • MARKETING • STRATEGY •",
        inner: "• FUTURE • TRENDS • DIGITAL • INNOVATION • TECH • FUTURE • TRENDS • DIGITAL • INNOVATION • TECH • FUTURE • TRENDS • DIGITAL • INNOVATION • TECH •"
      }
    },
    {
      id: 2,
      title: "tiktok's new creator monetization features explained",
      date: "3 February 2025",
      color: '#F7BFD9', // Pink (from the palette)
      textColor: '#222222',
      circleTexts: {
        outer: "• TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES • TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES • TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES •",
        middle: "• SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • ",
        inner: "• GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY • GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY • GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY •"
      }
    },
    {
      id: 3,
      title: "sustainable marketing: how brands are going green on social",
      date: "28 January 2025",
      color: '#76ACDD', // Light green
      textColor: '#222222',
      circleTexts: {
        outer: "• SUSTAINABILITY • ECO-FRIENDLY • GREEN MARKETING • CONSCIOUS BRANDS • ENVIRONMENT • SOCIAL IMPACT • RESPONSIBILITY • SUSTAINABILITY • ECO-FRIENDLY • GREEN MARKETING • CONSCIOUS BRANDS • ENVIRONMENT • SOCIAL IMPACT • RESPONSIBILITY • SUSTAINABILITY • ECO-FRIENDLY • GREEN MARKETING • CONSCIOUS BRANDS • ENVIRONMENT • SOCIAL IMPACT • RESPONSIBILITY • SUSTAINABILITY • ECO-FRIENDLY • GREEN MARKETING • CONSCIOUS BRANDS • ENVIRONMENT • SOCIAL IMPACT • RESPONSIBILITY •",
        middle: "• ENVIRONMENTAL • SOCIAL RESPONSIBILITY • VALUES • ETHICS • CONSUMERS • ENGAGEMENT • AUTHENTICITY • ENVIRONMENTAL • SOCIAL RESPONSIBILITY • VALUES • ETHICS • CONSUMERS • ENGAGEMENT • AUTHENTICITY • ENVIRONMENTAL • SOCIAL RESPONSIBILITY • VALUES • ETHICS • CONSUMERS • ENGAGEMENT • AUTHENTICITY •",
        inner: "• FUTURE • PLANET • CHANGE • IMPACT • VALUES • FUTURE • PLANET • CHANGE • IMPACT • VALUES • FUTURE • PLANET • CHANGE • IMPACT • VALUES •"
      }
    },
    {
      id: 4,
      title: "meta's new ai content disclosure tag: what it means for socials",
      date: "11 February 2025",
      color: '#E53935', // Red
      textColor: '#FFFFFF',
      circleTexts: {
        outer: "• AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES • AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES • AI CONTENT • DISCLOSURE • META • INSTAGRAM • FACEBOOK • TRANSPARENCY • ALGORITHM • POLICY • REGULATION • SOCIAL MEDIA • UPDATES •",
        middle: "• ALGORITHM • SOCIAL MEDIA • CONTENT POLICY • REGULATION • CREATORS • BRANDS • MARKETING • STRATEGY • ALGORITHM • SOCIAL MEDIA • CONTENT POLICY • REGULATION • CREATORS • BRANDS • MARKETING • STRATEGY •",
        inner: "• FUTURE • TRENDS • DIGITAL • INNOVATION • TECH • FUTURE • TRENDS • DIGITAL • INNOVATION • TECH • FUTURE • TRENDS • DIGITAL • INNOVATION • TECH •"
      }
    },
    {
      id: 5,
      title: "tiktok's new creator monetization features explained",
      date: "3 February 2025",
      color: '#F7BFD9', // Pink (from the palette)
      textColor: '#222222',
      circleTexts: {
        outer: "• TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES • TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES • TIKTOK • CREATORS • MONETIZATION • REVENUE • ENGAGEMENT • STRATEGY • GROWTH • PLATFORM • FEATURES • UPDATES •",
        middle: "• SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • SHORT FORM • VIDEO • CONTENT • VIRAL • TRENDS • CREATORS • AUDIENCE • ENGAGEMENT • ",
        inner: "• GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY • GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY • GROWTH • AUDIENCE • REACH • REVENUE • STRATEGY •"
      }
    },
  ];

  return (
    <section className="trends">
      <div className="container">
        <div className="trends-header">
          <h2 className="trends-title">тренды социальных медиа</h2>
          <p className="trends-subtitle">
            Мы постоянно отслеживаем изменения в индустрии, чтобы предлагать актуальные решения
          </p>
        </div>
        
        <div className="trends-content">
          <div className="trends-left">
            <div className="trends-intro">
              <div className="trends-written-for">исследование для</div>
              <div className="trends-brand">smm-studio</div>
              <div className="trends-quote">
                Будущее социальных медиа уже здесь, и мы помогаем брендам быть в авангарде.
              </div>
              <a href="#contact" className="trends-button">получить полный отчет</a>
            </div>
          </div>
          
          <div className="trends-right">
            {trends.map(trend => (
              <TrendItem 
                key={trend.id}
                trend={trend}
                isHovered={hoveredTrend === trend.id}
                onHover={setHoveredTrend}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trends;