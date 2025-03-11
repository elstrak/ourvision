// src/pages/TrendDetailPage/TrendDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import RelatedTrends from '../../components/Trends/RelatedTrends';
import './TrendDetailPage.css';

const TrendDetailPage = () => {
  const { id } = useParams();
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedTrends, setRelatedTrends] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/trends/${id}`);
        setTrend(response.data.data);
        
        // Загрузка связанных трендов
        const relatedResponse = await axios.get(`/api/trends?category=${response.data.data.category}&limit=3`);
        // Фильтруем, чтобы исключить текущий тренд
        const filtered = relatedResponse.data.data.filter(item => item._id !== id);
        setRelatedTrends(filtered);
        
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке тренда:', err);
        setError('Не удалось загрузить тренд. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
    // Прокрутка страницы вверх при загрузке
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="trend-detail-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Загрузка тренда...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !trend) {
    return (
      <>
        <Header />
        <div className="trend-detail-error">
          <h2>Упс! Что-то пошло не так</h2>
          <p>{error || 'Тренд не найден'}</p>
          <Link to="/trends" className="back-to-trends">Вернуться к трендам</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{trend.title} | Тренды</title>
        <meta name="description" content={trend.description} />
      </Helmet>
      
      <Header />
      
      <main className="trend-detail-container">
        <div className="trend-detail-header">
          <div className="trend-category">{trend.category}</div>
          <h1 className="trend-title">{trend.title}</h1>
          <div className="trend-meta">
            <span className="trend-date">
              {new Date(trend.createdAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
        
        <div className="trend-detail-image">
          <img src={trend.image} alt={trend.title} />
        </div>
        
        <div className="trend-detail-content">
          <div className="trend-description">
            <p>{trend.description}</p>
          </div>
          
          {/* Отображение форматированного содержания */}
          <div 
            className="trend-content"
            dangerouslySetInnerHTML={{ __html: trend.content }}
          />
        </div>
        
        {relatedTrends.length > 0 && (
          <div className="related-trends-section">
            <h2>Похожие тренды</h2>
            <RelatedTrends trends={relatedTrends} />
          </div>
        )}
        
        <div className="trend-actions">
          <Link to="/trends" className="back-to-trends">
            Вернуться к списку трендов
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default TrendDetailPage;