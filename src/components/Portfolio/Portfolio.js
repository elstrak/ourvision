import React from 'react';
import './Portfolio.css';
import showreelImage from '../../assets/images/showreel.jpg';
import logo from '../../assets/images/logo.svg';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="showreel">
          <div className="showreel-image">
            <img src={showreelImage} alt="Showreel 2023" />
            <div className="showreel-overlay">
              <a href="#" className="play-button">
                <img src={logo} alt="Play" className="play-icon" />
                Смотреть
              </a>
            </div>
          </div>
          <h2 className="showreel-title">SHOWREEL 2023</h2>
        </div>
        
        <div className="awards-section">
          <div className="award-card">
            <div className="award-icon">
              <img src={logo} alt="Award" />
            </div>
            <div className="award-content">
              <h3>Tagline Awards '23</h3>
              <p>Серебро</p>
            </div>
            <a href="#" className="award-link">
              <img src={logo} alt="Arrow" />
            </a>
          </div>
          
          <div className="award-card">
            <div className="award-icon">
              <img src={logo} alt="Award" />
            </div>
            <div className="award-content">
              <h3>WDA '23</h3>
              <p>Бронза</p>
            </div>
            <a href="#" className="award-link">
              <img src={logo} alt="Arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
