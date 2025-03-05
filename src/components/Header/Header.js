import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get current location and navigation function
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Определяем направление скролла
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
      
      // Устанавливаем состояние скролла
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If we're on the home page, just scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If we're on any other page, navigate to home
      navigate('/');
    }
  };

  // Меню навигации
  const menuItems = [
    { id: 1, text: 'кейсы', color: '#222222', textColor: '#FFFFFF', link: '/' },
    { id: 2, text: 'о нас', color: '#222222', textColor: '#FFFFFF', link: '/' },
    { id: 3, text: 'тренды', color: '#FF7F50', textColor: '#FFFFFF', link: '/trends' },
    { id: 4, text: 'карьера', color: '#FF7F50', textColor: '#FFFFFF', link: '/' },
    { id: 5, text: 'контакты', color: '#FFD700', textColor: '#FFFFFF', link: '/contact' }
  ];

  return (
    <header className="header">
      <div className="logo-button" onClick={handleLogoClick}>
        <div className="logo-circle">
          <span>OURVISION</span>
        </div>
      </div>
      
      <div 
        className={`menu-container ${isScrolled ? 'scrolled' : ''} ${isScrollingUp ? 'scrolling-up' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="menu-buttons">
          {menuItems.map((item) => (
            <Link 
              key={item.id}
              to={item.link}
              className="menu-item"
              style={{ 
                backgroundColor: item.color,
                color: item.textColor
              }}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;