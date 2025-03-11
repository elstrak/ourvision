// src/components/Trends/Trends.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Trends.css';
import TrendItem from './TrendItem';

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Цвета для квадратов
  const colors = ['#FF4D4F', '#1890FF', '#52C41A', '#F759AB'];

  // Функция для получения случайного цвета
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Присваиваем каждому тренду случайный цвет
  const assignColorsToTrends = (trendsData) => {
    return trendsData.map(trend => ({
      ...trend,
      color: getRandomColor()
    }));
  };

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/trends');
        
        // Берем последние 5 трендов и присваиваем им цвета
        const latestTrends = response.data.data.slice(0, 5);
        const trendsWithColors = assignColorsToTrends(latestTrends);
        
        setTrends(trendsWithColors);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке трендов:', err);
        setError('Не удалось загрузить тренды. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="trends-section">
        <div className="trends-container">
          <div className="section-header">
            <h2>тренды и инсайты</h2>
            <p>узнайте о последних тенденциях в мире дизайна и технологий</p>
          </div>
          <div className="trends-flex">
            <div className="trends-intro">
              <div className="trends-description">
                <p>следите за актуальными трендами в SMM и маркетинге. Используйте наши инсайты для создания эффективных стратегий.</p>
              </div>
              <Link to="/trends" className="trends-button">полезности</Link>
            </div>
            <div className="trends-loading">
              <div className="spinner"></div>
              <p>Загрузка трендов...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trends-section">
        <div className="trends-container">
          <div className="section-header">
            <h2>тренды и инсайты</h2>
            <p>Узнайте о последних тенденциях в мире дизайна и технологий</p>
          </div>
          <div className="trends-flex">
            <div className="trends-intro">
              <div className="trends-description">
                <p>Следите за актуальными трендами в SMM и маркетинге. Используйте наши инсайты для создания эффективных стратегий.</p>
              </div>
              <Link to="/trends" className="trends-button">полезности</Link>
            </div>
            <div className="trends-error">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (trends.length === 0) {
    return (
      <div className="trends-section">
        <div className="trends-container">
          <div className="section-header">
            <h2>Тренды и инсайты</h2>
            <p>Узнайте о последних тенденциях в мире дизайна и технологий</p>
          </div>
          <div className="trends-flex">
            <div className="trends-intro">
              <div className="trends-description">
                <p>Следите за актуальными трендами в SMM и маркетинге. Используйте наши инсайты для создания эффективных стратегий.</p>
              </div>
              <Link to="/trends" className="trends-button">Смотреть все тренды</Link>
            </div>
            <div className="trends-empty">
              <p>Тренды не найдены. <Link to="/admin/trends">Добавьте первый тренд</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trends-section">
      <div className="trends-container">
        <div className="section-header">
          <h2>тренды и инсайты</h2>
          <p>узнайте о последних тенденциях в мире дизайна и технологий</p>
        </div>
        <div className="trends-flex">
          <div className="trends-intro">
            <div className="trends-description">
              <p>следите за актуальными трендами в SMM и маркетинге. 
                <br />
                используйте наши инсайты для создания эффективных стратегий.</p>
            </div>
            <Link to="/trends" className="trends-button">полезности</Link>
          </div>
          <div className="trends-list">
            {trends.map(trend => (
              <div key={trend._id} className="trend-list-item">
                <Link to={`/trends/${trend._id}`} className="trend-list-link">
                  <div className="trend-shape" style={{ backgroundColor: trend.color }}>
                    <div className="trend-circle">
                      <div className="rotating-text-inner">
                        <span style={{ '--i': 1 }}>т</span>
                        <span style={{ '--i': 2 }}>р</span>
                        <span style={{ '--i': 3 }}>е</span>
                        <span style={{ '--i': 4 }}>н</span>
                        <span style={{ '--i': 5 }}>д</span>
                        <span style={{ '--i': 6 }}>•</span>
                        
                      </div>
                      <div className="rotating-text-middle">
                        <span style={{ '--i': 1 }}>и</span>
                        <span style={{ '--i': 2 }}>н</span>
                        <span style={{ '--i': 3 }}>с</span>
                        <span style={{ '--i': 4 }}>а</span>
                        <span style={{ '--i': 5 }}>й</span>
                        <span style={{ '--i': 6 }}>т</span>
                      </div>
                      <div className="rotating-text-outer">
                        <span style={{ '--i': 1 }}>с</span>
                        <span style={{ '--i': 2 }}>м</span>
                        <span style={{ '--i': 3 }}>м</span>
                        <span style={{ '--i': 4 }}>•</span>
                        <span style={{ '--i': 5 }}>н</span>
                        <span style={{ '--i': 6 }}>о</span>
                      </div>
                    </div>
                  </div>
                  <div className="trend-list-content">
                    <div className="trend-list-meta">
                      <span className="trend-list-category">{trend.category}</span>
                      <span className="trend-list-date">
                        {new Date(trend.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <h3 className="trend-list-title">{trend.title}</h3>
                    <p className="trend-list-excerpt">
                      {trend.description.length > 60 ? 
                        `${trend.description.substring(0, 60)}...` : trend.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;