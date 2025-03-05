import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={logo} alt="Our Vision Logo" className="footer-logo-img" />
            </div>
            <p className="footer-description">
              Создаем уникальные digital-решения для вашего бизнеса с 2020 года.
              Наша команда профессионалов поможет вам выделиться среди конкурентов.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Навигация</h3>
            <ul className="footer-links">
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/trends">Тренды</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
              <li><Link to="/brief">Бриф</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Контакты</h3>
            <ul className="footer-contact">
              <li>
                <a href="mailto:info@ourvision.ru" className="footer-contact-link email">
                  info@ourvision.ru
                </a>
              </li>
              <li>
                <a href="tel:+79991234567" className="footer-contact-link phone">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li>
                <p className="footer-address">
                  Петропавловск-Камчатский
                </p>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Социальные сети</h3>
            <div className="footer-social">
              <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="social-link">VK</a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="social-link">Telegram</a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {currentYear} Our Vision. Все права защищены.</p>
          <div className="footer-policy">
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;