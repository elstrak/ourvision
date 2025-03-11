// src/components/Trends/TrendItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TrendItem.css';

const TrendItem = ({ trend }) => {
  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Обрезаем описание до 100 символов
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="trend-item">
      <div className="trend-item-image">
        <img src={trend.image} alt={trend.title} />
        {trend.featured && <span className="trend-item-badge">Популярное</span>}
      </div>
      <div className="trend-item-content">
        <div className="trend-item-meta">
          <span className="trend-item-category">{trend.category}</span>
          <span className="trend-item-date">{formatDate(trend.createdAt)}</span>
        </div>
        <h3 className="trend-item-title">
          <Link to={`/trends/${trend._id}`}>{trend.title}</Link>
        </h3>
        <p className="trend-item-excerpt">{truncateDescription(trend.description)}</p>
        <Link to={`/trends/${trend._id}`} className="trend-item-link">
          Читать далее
        </Link>
      </div>
    </div>
  );
};

export default TrendItem;