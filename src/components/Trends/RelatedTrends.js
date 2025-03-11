// src/components/Trends/RelatedTrends.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RelatedTrends.css';

const RelatedTrends = ({ trends }) => {
  if (!trends || trends.length === 0) {
    return null;
  }

  return (
    <div className="related-trends">
      <div className="related-trends-grid">
        {trends.map(trend => (
          <Link to={`/trends/${trend._id}`} key={trend._id} className="related-trend-card">
            <div className="related-trend-image">
              <img src={trend.image} alt={trend.title} />
            </div>
            <div className="related-trend-content">
              <span className="related-trend-category">{trend.category}</span>
              <h3 className="related-trend-title">{trend.title}</h3>
              <p className="related-trend-description">
                {trend.description.length > 80 
                  ? `${trend.description.substring(0, 80)}...` 
                  : trend.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTrends;