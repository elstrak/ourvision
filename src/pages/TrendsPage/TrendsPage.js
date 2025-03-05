// src/pages/TrendsPage/TrendsPage.js
import React, { useState, useEffect } from 'react';
import './TrendsPage.css';
import '../../styles/global.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const TrendItem = ({ trend }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`trend-page-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`trend-shape ${trend.shape}`}
        style={{ backgroundColor: trend.color }}
      >
      </div>
      
      <div className="trend-content">
        <div className="trend-date">{trend.date}</div>
        <h3 className="trend-title">{trend.title}</h3>
        {trend.categories && (
          <div className="trend-categories">
            {trend.categories.map(category => (
              <span key={category} className="trend-category">{category}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MonthSection = ({ month, year, trends }) => {
  return (
    <div className="month-section">
      <div className="month-header">
        <h2 className="month-title">{month} {year}</h2>
        <div className="month-divider"></div>
      </div>
      <div className="month-trends">
        {trends.map(trend => (
          <TrendItem key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
};

const TrendsPage = () => {
  // All available categories
  const allCategories = [
    'AI', 'Social Media', 'Content Strategy', 'Analytics', 
    'Influencer Marketing', 'Branding', 'Engagement', 
    'Advertising', 'Video Content', 'Trends'
  ];
  
  // State for filters
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonths, setSelectedMonths] = useState(['All']);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredTrends, setFilteredTrends] = useState({});
  
  // Available years and months for filters
  const years = ['All', '2025', '2024'];
  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  // All trends data with categories
  const allTrends = {
    'February 2025': [
      {
        id: 1,
        title: "meta's new ai content disclosure tag: what it means for socials",
        date: "11 February 2025",
        color: '#4285F4', // Blue
        shape: "trend-shape-circle",
        categories: ['AI', 'Social Media', 'Content Strategy']
      }
    ],
    'January 2025': [
      {
        id: 2,
        title: "less censorship, more chaos: meta's new route",
        date: "13 January 2025",
        color: '#4285F4', // Blue
        shape: "trend-shape-circle",
        categories: ['Social Media', 'Content Strategy', 'Trends']
      }
    ],
    'December 2024': [
      {
        id: 3,
        title: "the beste youtube ads of 2024",
        date: "24 December 2024",
        color: '#FF7043', // Coral
        shape: "trend-shape-circle",
        categories: ['Video Content', 'Advertising', 'Engagement']
      },
      {
        id: 4,
        title: "what about facebook?",
        date: "10 December 2024",
        color: '#4285F4', // Blue
        shape: "trend-shape-circle",
        categories: ['Social Media', 'Analytics', 'Engagement']
      }
    ],
    'November 2024': [
      {
        id: 5,
        title: "time for an instagram reset?",
        date: "28 November 2024",
        color: '#FFCA28', // Yellow
        shape: "trend-shape-circle",
        categories: ['Social Media', 'Branding', 'Influencer Marketing']
      }
    ]
  };

  // Handle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle month selection
  const toggleMonth = (month) => {
    if (month === 'All') {
      setSelectedMonths(['All']);
      return;
    }
    
    // If 'All' is currently selected, remove it
    const newSelectedMonths = selectedMonths.filter(m => m !== 'All');
    
    if (selectedMonths.includes(month)) {
      // Remove the month if it's already selected
      const updatedMonths = newSelectedMonths.filter(m => m !== month);
      // If no months left, select 'All'
      setSelectedMonths(updatedMonths.length === 0 ? ['All'] : updatedMonths);
    } else {
      // Add the month
      setSelectedMonths([...newSelectedMonths, month]);
    }
  };

  // Handle year selection
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedYear('All');
    setSelectedMonths(['All']);
    setSelectedCategories([]);
  };

  // Filter trends based on selected filters
  useEffect(() => {
    let filtered = { ...allTrends };
    
    // Filter by year
    if (selectedYear !== 'All') {
      filtered = Object.entries(filtered).reduce((acc, [monthYear, trends]) => {
        if (monthYear.includes(selectedYear)) {
          acc[monthYear] = trends;
        }
        return acc;
      }, {});
    }
    
    // Filter by months
    if (!selectedMonths.includes('All')) {
      filtered = Object.entries(filtered).reduce((acc, [monthYear, trends]) => {
        const [month] = monthYear.split(' ');
        if (selectedMonths.includes(month)) {
          acc[monthYear] = trends;
        }
        return acc;
      }, {});
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = Object.entries(filtered).reduce((acc, [monthYear, trends]) => {
        const filteredTrends = trends.filter(trend => 
          trend.categories.some(category => selectedCategories.includes(category))
        );
        
        if (filteredTrends.length > 0) {
          acc[monthYear] = filteredTrends;
        }
        
        return acc;
      }, {});
    }
    
    setFilteredTrends(filtered);
  }, [selectedYear, selectedMonths, selectedCategories]);

  return (
    <div className="trends-page">
      <Header />
      <div className="trends-page-container">
        <div className="trends-page-header">
          <h1 className="trends-page-title">тренды социальных медиа</h1>
          <p className="trends-page-subtitle">
            Мы постоянно отслеживаем изменения в индустрии, чтобы предлагать актуальные решения
          </p>
        </div>
        
        <div className="trends-page-content">
          <div className="trends-page-left">
            <div className="trends-filters">
              <h3 className="filters-title">Фильтры</h3>
              
              <div className="filter-section">
                <h4 className="filter-heading">Год</h4>
                <div className="filter-options">
                  {years.map(year => (
                    <button 
                      key={year}
                      className={`filter-button ${selectedYear === year ? 'active' : ''}`}
                      onClick={() => handleYearChange(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-section">
                <h4 className="filter-heading">Месяц</h4>
                <div className="filter-options">
                  {months.map(month => (
                    <button 
                      key={month}
                      className={`filter-button ${selectedMonths.includes(month) ? 'active' : ''}`}
                      onClick={() => toggleMonth(month)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="filter-section">
                <h4 className="filter-heading">Категории</h4>
                <div className="filter-categories">
                  {allCategories.map(category => (
                    <button 
                      key={category}
                      className={`filter-category ${selectedCategories.includes(category) ? 'active' : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <button className="reset-filters" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          </div>
          
          <div className="trends-page-right">
            {Object.keys(filteredTrends).length > 0 ? (
              Object.entries(filteredTrends).map(([monthYear, trends]) => {
                const [month, year] = monthYear.split(' ');
                return (
                  <MonthSection 
                    key={monthYear}
                    month={month}
                    year={year}
                    trends={trends}
                  />
                );
              })
            ) : (
              <div className="no-results">
                <p>Нет результатов, соответствующих выбранным фильтрам.</p>
                <button className="reset-filters" onClick={resetFilters}>
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrendsPage;