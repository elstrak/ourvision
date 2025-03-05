import React, { useState } from 'react';
import './CareerPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import logo from '../../assets/images/logo.png';

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState('department');
  
  // Категории вакансий
  const categories = [
    { id: 'department', name: 'Отдел' },
    { id: 'location', name: 'Локация' },
    { id: 'jobType', name: 'Тип работы' }
  ];
  
  // Группы вакансий
  const jobGroups = [
    {
      title: 'Дизайн и креатив',
      jobs: [
        { title: 'UI/UX Дизайнер', type: 'Полная занятость', location: 'Москва' },
        { title: 'Графический дизайнер', type: 'Полная занятость', location: 'Москва' },
        { title: 'Креативный директор', type: 'Полная занятость', location: 'Москва' }
      ]
    },
    {
      title: 'Разработка',
      jobs: [
        { title: 'Frontend-разработчик', type: 'Полная занятость', location: 'Москва' },
        { title: 'Backend-разработчик', type: 'Полная занятость', location: 'Санкт-Петербург' },
        { title: 'Fullstack-разработчик', type: 'Полная занятость', location: 'Удаленно' }
      ]
    },
    {
      title: 'Маркетинг и SMM',
      jobs: [
        { title: 'SMM-специалист', type: 'Полная занятость', location: 'Москва' },
        { title: 'Контент-менеджер', type: 'Частичная занятость', location: 'Удаленно' },
        { title: 'Таргетолог', type: 'Полная занятость', location: 'Москва' },
        { title: 'Специалист по контекстной рекламе', type: 'Полная занятость', location: 'Санкт-Петербург' }
      ]
    },
    {
      title: 'Стажировки',
      jobs: [
        { title: 'Стажер-дизайнер', type: 'Стажировка', location: 'Москва' },
        { title: 'Стажер-разработчик', type: 'Стажировка', location: 'Москва' },
        { title: 'Стажер-маркетолог', type: 'Стажировка', location: 'Удаленно' }
      ]
    }
  ];
  
  return (
    <div className="career-page">
      <Header />
      
      <div className="career-hero">
        <div className="career-hero-content">
          <div className="career-logo-container">
            <img src={logo} alt="Our Vision Logo" className="career-logo" />
          </div>
        </div>
      </div>
      
      <div className="career-content">
        <div className="container">
          <h1 className="career-title">Наши вакансии</h1>
          
          <div className="career-tabs">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`career-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="career-jobs-container">
            {jobGroups.map((group, index) => (
              <div key={index} className="career-job-group">
                <h2 className="job-group-title">{group.title}</h2>
                
                <div className="job-list">
                  {group.jobs.map((job, jobIndex) => (
                    <div key={jobIndex} className="job-item">
                      <div className="job-details">
                        <h3 className="job-title">{job.title}</h3>
                        <div className="job-meta">
                          <span className="job-type">{job.type}</span>
                          <span className="job-location">{job.location}</span>
                        </div>
                      </div>
                      <a href="#" className="job-apply-btn">Подробнее</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="career-cta">
            <h2 className="cta-title">Не нашли подходящую вакансию?</h2>
            <p className="cta-text">Отправьте нам своё резюме, и мы свяжемся с вами, когда появится подходящая позиция</p>
            <a href="/contact" className="cta-button">Отправить резюме</a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CareerPage;