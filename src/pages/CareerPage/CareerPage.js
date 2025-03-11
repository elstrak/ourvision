// src/pages/CareerPage/CareerPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CareerPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import logo from '../../assets/images/logo.png';

const CareerPage = () => {
  const [activeTab, setActiveTab] = useState('department');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Категории вакансий
  const categories = [
    { id: 'department', name: 'Отдел' },
    { id: 'location', name: 'Локация' },
    { id: 'jobType', name: 'Тип работы' }
  ];
  
  useEffect(() => {
    // Получаем вакансии с API
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/jobs');
        setJobs(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке вакансий:', err);
        setError('Не удалось загрузить вакансии. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Группировка вакансий по выбранной категории
  const getGroupedJobs = () => {
    if (!jobs || jobs.length === 0) return [];
    
    let groupedJobs = [];
    
    if (activeTab === 'department') {
      // Группировка по отделам
      const departments = [...new Set(jobs.map(job => job.department || 'Другое'))];
      
      departments.forEach(department => {
        groupedJobs.push({
          title: department,
          jobs: jobs.filter(job => (job.department || 'Другое') === department)
        });
      });
    } else if (activeTab === 'location') {
      // Группировка по локациям
      const locations = [...new Set(jobs.map(job => job.location))];
      
      locations.forEach(location => {
        groupedJobs.push({
          title: location,
          jobs: jobs.filter(job => job.location === location)
        });
      });
    } else if (activeTab === 'jobType') {
      // Группировка по типу работы
      const jobTypes = [...new Set(jobs.map(job => job.type))];
      
      jobTypes.forEach(type => {
        groupedJobs.push({
          title: type,
          jobs: jobs.filter(job => job.type === type)
        });
      });
    }
    
    return groupedJobs;
  };
  
  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

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
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Загрузка вакансий...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="no-jobs-message">
                <p>В настоящее время нет открытых вакансий.</p>
              </div>
            ) : (
              getGroupedJobs().map((group, index) => (
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
                          <p className="job-description">{job.shortDescription || job.description.substring(0, 150) + '...'}</p>
                        </div>
                        <button 
                          className="job-details-btn"
                          onClick={() => openJobModal(job)}
                        >
                          Подробнее
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {isModalOpen && selectedJob && (
        <div className="job-modal-overlay">
          <div className="job-modal">
            <button className="job-modal-close" onClick={closeJobModal}>
              &times;
            </button>
            
            <div className="job-modal-content">
              <h2 className="job-modal-title">{selectedJob.title}</h2>
              
              <div className="job-modal-meta">
                <span className="job-modal-type">{selectedJob.type}</span>
                <span className="job-modal-location">{selectedJob.location}</span>
                {selectedJob.salary && (
                  <span className="job-modal-salary">{selectedJob.salary}</span>
                )}
              </div>
              
              <div className="job-modal-description">
                <p>{selectedJob.description}</p>
              </div>
              
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="job-modal-section">
                  <h3>Требования:</h3>
                  <ul>
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div className="job-modal-section">
                  <h3>Обязанности:</h3>
                  <ul>
                    {selectedJob.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedJob.benefits && selectedJob.benefits.length > 0 && (
                <div className="job-modal-section">
                  <h3>Мы предлагаем:</h3>
                  <ul>
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="job-modal-apply">
                <a href={`mailto:hr@ourvision.com?subject=Вакансия: ${selectedJob.title}`} className="job-apply-btn">
                  Откликнуться на вакансию
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CareerPage;