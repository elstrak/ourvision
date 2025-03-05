import React from 'react';
import './Achievements.css';
import logo from '../../assets/images/logo.svg';

const Achievements = () => {
  return (
    <section className="achievements">
      <div className="container">
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-content">
              <div className="achievement-header">
                <h3>Рейтинг Рунета</h3>
                <img src={logo} alt="Ruward" className="achievement-logo" />
              </div>
              <p className="achievement-text">
                10 место рейтинга лучших SMM-агентств
              </p>
            </div>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-content">
              <div className="achievement-header">
                <h3>TOP-5 RUWARD</h3>
                <img src={logo} alt="Ruward" className="achievement-logo" />
              </div>
              <p className="achievement-text">
                Influencer marketing
              </p>
            </div>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-content">
              <div className="achievement-header">
                <h3>Член Partners' Club by AGIMA</h3>
                <img src={logo} alt="AGIMA" className="achievement-logo" />
              </div>
            </div>
          </div>
          
          <div className="achievement-card">
            <div className="achievement-content">
              <div className="achievement-header">
                <h3>Член ассоциации Развития Digital Агентств</h3>
                <img src={logo} alt="ARDA" className="achievement-logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;