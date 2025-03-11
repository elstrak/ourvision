// src/pages/ProjectsPage/ProjectsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeService, setActiveService] = useState('all');
  
  const industries = [
    { id: 'all', name: 'Все сферы' },
    { id: 'Мобильные операторы', name: 'Мобильные операторы' },
    { id: 'Товары', name: 'Товары' },
    { id: 'Услуги', name: 'Услуги' },
    { id: 'Образование', name: 'Образование' },
    { id: 'Девелоперы', name: 'Девелоперы' },
    { id: 'FMCG', name: 'FMCG' },
    { id: 'Фарма и медицинские услуги', name: 'Фарма и медицинские услуги' }
  ];
  
  const services = [
    { id: 'all', name: 'Все услуги' },
    { id: ' Брендинг ', name: 'Брендинг ' },
    { id: ' Веб-дизайн ', name: 'Веб-дизайн ' },
    { id: ' Мобильные приложения ', name: 'Мобильные приложения ' },
    { id: ' Маркетинг ', name: 'Маркетинг ' },
    { id: ' Стратегия ', name: 'Стратегия ' },
    { id: ' Контент ', name: 'Контент ' }
  ];
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        let url = '/api/projects';
        const params = new URLSearchParams();
        
        if (activeIndustry !== 'all') {
          params.append('industry', activeIndustry);
        }
        
        if (activeService !== 'all') {
          params.append('service', activeService);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const res = await axios.get(url);
        setProjects(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке проектов:', err);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [activeIndustry, activeService]);
  
  const handleFilterChange = (type, value) => {
    if (type === 'industry') {
      setActiveIndustry(value);
    } else if (type === 'service') {
      setActiveService(value);
    }
  };
  
  return (
    <div className="projects-page">
      <Header />
      
      <main className="projects-content">
        <div className="container">
          <div className="projects-header">
            <h1>Наши проекты</h1>
            <p>Ознакомьтесь с нашими последними работами и кейсами</p>
          </div>
          
          <div className="projects-filter">
            <div className="filter-section">
              <h3>Сфера деятельности</h3>
              <ul className="filter-categories">
                {industries.map(industry => (
                  <li key={industry.id}>
                    <button 
                      className={activeIndustry === industry.id ? 'active' : ''}
                      onClick={() => handleFilterChange('industry', industry.id)}
                    >
                      {industry.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="filter-section">
              <h3>Услуги</h3>
              <ul className="filter-categories">
                {services.map(service => (
                  <li key={service.id}>
                    <button 
                      className={activeService === service.id ? 'active' : ''}
                      onClick={() => handleFilterChange('service', service.id)}
                    >
                      {service.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {loading ? (
            <div className="projects-loading">
              <div className="loader"></div>
              <p>Загрузка проектов...</p>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.length === 0 ? (
                <div className="projects-empty">
                  <p>Проекты не найдены</p>
                </div>
              ) : (
                projects.map(project => (
                  <Link 
                    to={`/projects/${project._id}`} 
                    className="project-card" 
                    key={project._id}
                  >
                    <div className="project-image">
                      <img src={project.coverImage} alt={project.title} />
                      <div className="project-overlay">
                        <div className="project-categories">
                          <span className="project-industry">{project.industry}</span>
                          <span className="project-service">
                            {Array.isArray(project.services) ? project.services.join(' ') : project.services}
                          </span>
                        </div>
                        <div className="project-short-desc">
                          <p>{project.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p className="project-client">{project.client}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;