import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './Footer.css';
import showreelImage from '../../assets/images/showreel.jpg';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Цвета из палитры
  const colors = [
    '#75ACDD', // Голубой
    '#B8C4B8', // Светло-зеленый
    '#F7BFD9', // Розовый
    '#FFD700', // Золотой
    '#FF7F50'  // Коралловый
  ];
  
  // Массив кнопок для футера
  const buttons = [
    { id: 1, text: 'пользовательское соглашение', delay: 100, x: 10, color: colors[0] },
    { id: 2, text: 'telegram', delay: 300, x: 30, color: colors[1] },
    { id: 3, text: 'instagram', delay: 500, x: 50, color: colors[2] },
    { id: 4, text: 'ourvision@example.com', delay: 700, x: 70, color: colors[3] },
    { id: 5, text: 'cookies', delay: 900, x: 90, color: colors[4] },
  ];
  
  // Состояние для хранения позиций и скоростей кнопок
  const [buttonStates, setButtonStates] = useState(
    buttons.map(button => ({
      x: button.x + '%',
      y: -100,
      vx: 0,
      vy: 0,
      isDragging: false
    }))
  );
  
  // Отслеживание размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Отслеживание скролла для анимации
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        
        // Если футер виден на экране
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Анимация падения и отскока кнопок
  useEffect(() => {
    if (!isVisible) return;
    
    let animationFrameId;
    let lastTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000; // в секундах
      lastTime = currentTime;
      
      setButtonStates(prevStates => {
        return prevStates.map((state, index) => {
          if (state.isDragging) return state;
          
          // Преобразование строковых значений в числа
          let x = typeof state.x === 'string' ? parseFloat(state.x) : state.x;
          let y = typeof state.y === 'string' ? parseFloat(state.y) : state.y;
          
          // Если x в процентах, преобразуем в пиксели
          if (typeof state.x === 'string' && state.x.includes('%')) {
            x = (parseFloat(state.x) / 100) * windowSize.width;
          }
          
          // Применяем гравитацию
          let vx = state.vx;
          let vy = state.vy + 9.8 * deltaTime * 10; // гравитация
          
          // Обновляем позицию
          x += vx * deltaTime * 60;
          y += vy * deltaTime * 60;
          
          // Получаем размеры кнопки (примерно)
          const buttonWidth = 150;
          const buttonHeight = 50;
          
          // Проверяем столкновение с полом
          if (y > windowSize.height - buttonHeight) {
            y = windowSize.height - buttonHeight;
            vy = -vy * 0.7; // отскок с потерей энергии
            
            // Добавляем трение при отскоке от пола
            vx = vx * 0.9;
          }
          
          // Проверяем столкновение с левой и правой стенами
          if (x < 0) {
            x = 0;
            vx = -vx * 0.7;
          } else if (x > windowSize.width - buttonWidth) {
            x = windowSize.width - buttonWidth;
            vx = -vx * 0.7;
          }
          
          // Останавливаем движение, если скорость очень мала
          if (Math.abs(vx) < 0.1) vx = 0;
          if (Math.abs(vy) < 0.1 && Math.abs(y - (windowSize.height - buttonHeight)) < 1) {
            vy = 0;
            y = windowSize.height - buttonHeight;
          }
          
          return { ...state, x, y, vx, vy };
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Запускаем анимацию падения для каждой кнопки с задержкой
    buttons.forEach((button, index) => {
      setTimeout(() => {
        setButtonStates(prevStates => {
          const newStates = [...prevStates];
          const x = (button.x / 100) * windowSize.width;
          newStates[index] = { 
            ...newStates[index], 
            x,
            y: -100,
            vy: 2 // начальная скорость падения
          };
          return newStates;
        });
      }, button.delay);
    });
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, windowSize]);
  
  // Компонент кнопки с физикой
  const DraggableButton = ({ children, index, color }) => {
    // Начальная позиция кнопки
    const [{ x, y }, api] = useSpring(() => ({ 
      x: buttonStates[index].x, 
      y: buttonStates[index].y,
      config: { mass: 1, tension: 350, friction: 40 }
    }));
    
    // Обновление позиции при изменении состояния
    useEffect(() => {
      api.start({ 
        x: buttonStates[index].x, 
        y: buttonStates[index].y,
        config: buttonStates[index].isDragging ? config.stiff : config.wobbly
      });
    }, [buttonStates[index].x, buttonStates[index].y, buttonStates[index].isDragging]);
    
    // Обработчик перетаскивания
    const bind = useDrag(({ offset: [ox, oy], velocity: [vx, vy], first, last, active }) => {
      // Обновление состояния при начале перетаскивания
      if (first) {
        setButtonStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = { ...newStates[index], isDragging: true, vx: 0, vy: 0 };
          return newStates;
        });
      }
      
      // Обновление позиции при перетаскивании
      api.start({ x: ox, y: oy, immediate: active });
      
      // Обновление состояния после окончания перетаскивания
      if (last) {
        setButtonStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = { 
            ...newStates[index], 
            x: ox, 
            y: oy, 
            vx: vx * 5, // Умножаем на коэффициент для усиления эффекта
            vy: vy * 5,
            isDragging: false 
          };
          return newStates;
        });
      }
    });
    
    return (
      <animated.div 
        className="footer-button"
        style={{ 
          x, 
          y,
          backgroundColor: color,
          color: ['#75ACDD', '#B8C4B8'].includes(color) ? '#000' : '#fff'
        }}
        {...bind()}
      >
        {children}
      </animated.div>
    );
  };
  
  return (
    <footer id="footer" className="footer" ref={footerRef}>
      <div className="footer-image-container">
        <img src={showreelImage} alt="OURVISION" className="footer-image" />
        <div className="footer-overlay"></div>
      </div>
      
      <h2 className="footer-title">OURVISION</h2>
      
      {buttons.map((button, index) => (
        <DraggableButton key={button.id} index={index} color={button.color}>
          {button.text}
        </DraggableButton>
      ))}
    </footer>
  );
};

export default Footer;