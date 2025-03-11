// src/pages/TrendsPage/TrendsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './TrendsPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TrendsPage = () => {
  const [trends, setTrends] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [activeMonth, setActiveMonth] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Месяцы для фильтрации
  const months = [
    { value: 'january', label: 'январь' },
    { value: 'february', label: 'февраль' },
    { value: 'march', label: 'март' },
    { value: 'april', label: 'апрель' },
    { value: 'may', label: 'май' },
    { value: 'june', label: 'июнь' },
    { value: 'july', label: 'июль' },
    { value: 'august', label: 'август' },
    { value: 'september', label: 'сентябрь' },
    { value: 'october', label: 'октябрь' },
    { value: 'november', label: 'ноябрь' },
    { value: 'december', label: 'декабрь' }
  ];

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/trends');
        const trendsData = response.data.data;
        setTrends(trendsData);
        setFilteredTrends(trendsData);
        
        // Извлекаем уникальные категории из трендов
        const uniqueCategories = [...new Set(trendsData.map(trend => trend.category))];
        setCategories(uniqueCategories);
        
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

  // Применение всех фильтров
  useEffect(() => {
    let result = [...trends];
    
    // Фильтр по категории
    if (activeCategory !== 'all') {
      result = result.filter(trend => trend.category === activeCategory);
    }
    
    // Фильтр по году
    if (activeYear !== 'all') {
      result = result.filter(trend => {
        const trendYear = new Date(trend.createdAt).getFullYear().toString();
        return trendYear === activeYear;
      });
    }
    
    // Фильтр по месяцу
    if (activeMonth !== 'all') {
      result = result.filter(trend => {
        const trendMonth = new Date(trend.createdAt).getMonth();
        const monthIndex = months.findIndex(m => m.value === activeMonth);
        return trendMonth === monthIndex;
      });
    }
    
    setFilteredTrends(result);
  }, [activeCategory, activeYear, activeMonth, trends]);

  // Обработчики фильтров
  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
  };
  
  const handleYearFilter = (year) => {
    setActiveYear(year);
  };
  
  const handleMonthFilter = (month) => {
    setActiveMonth(month);
  };
  
  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="trends-page">
      <Helmet>
        <title>Тренды | Наш сайт</title>
        <meta name="description" content="Актуальные тренды и новости в мире дизайна и технологий" />
      </Helmet>
      
      <Header />
      
      <main className="trends-layout">
        <div className="trends-sidebar">
          <div className="categories-container">
            <h2 className="categories-title">фильтры</h2>
            
            {/* Фильтр по году */}
            <div className="filter-section">
              <h3 className="filter-title">год</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${activeYear === 'all' ? 'active' : ''}`}
                  onClick={() => handleYearFilter('all')}
                >
                  all
                </button>
                <button 
                  className={`filter-option ${activeYear === '2025' ? 'active' : ''}`}
                  onClick={() => handleYearFilter('2025')}
                >
                  2025
                </button>
                <button 
                  className={`filter-option ${activeYear === '2024' ? 'active' : ''}`}
                  onClick={() => handleYearFilter('2024')}
                >
                  2024
                </button>
              </div>
            </div>
            
            {/* Фильтр по месяцу */}
            <div className="filter-section">
              <h3 className="filter-title">месяц</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${activeMonth === 'all' ? 'active' : ''}`}
                  onClick={() => handleMonthFilter('all')}
                >
                  all
                </button>
                {months.map(month => (
                  <button 
                    key={month.value}
                    className={`filter-option ${activeMonth === month.value ? 'active' : ''}`}
                    onClick={() => handleMonthFilter(month.value)}
                  >
                    {month.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Фильтр по категориям */}
            <div className="filter-section">
              <h3 className="filter-title">категории</h3>
              <div className="filter-options">
                <button 
                  className={`filter-option ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter('all')}
                >
                  all
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    className={`filter-option ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="trends-content">
          <h1 className="trends-title">Тренды</h1>
          
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Загрузка трендов...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : filteredTrends.length === 0 ? (
            <div className="no-trends-message">
              <p>Тренды не найдены</p>
            </div>
          ) : (
            <div className="trends-list">
              {filteredTrends.map(trend => (
                <Link to={`/trends/${trend._id}`} key={trend._id} className="trend-card">
                  <div className="trend-card-content">
                    <div className="trend-meta">
                      <span className="trend-category">{trend.category}</span>
                      <span className="trend-date">{formatDate(trend.createdAt)}</span>
                    </div>
                    <h2 className="trend-title">{trend.title}</h2>
                    <p className="trend-description">{trend.description}</p>
                  </div>
                  <div className="trend-image">
                    <img src={trend.image} alt={trend.title} />
                    {trend.featured && <span className="featured-badge">Популярное</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrendsPage;