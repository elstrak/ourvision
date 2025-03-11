// src/pages/ProjectDetailPage/ProjectDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects/${id}`);
        console.log('Полученные данные проекта:', res.data.data);
        setProject(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка при загрузке проекта:', err);
        setError('Проект не найден или произошла ошибка при загрузке.');
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);
  
  const openGallery = (imageUrl) => {
    setActiveImage(imageUrl);
    setIsGalleryOpen(true);
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
  };
  
  const closeGallery = () => {
    setIsGalleryOpen(false);
    // Разблокируем прокрутку страницы
    document.body.style.overflow = 'auto';
  };
  
  const navigateGallery = (direction) => {
    if (!project || !project.gallery || project.gallery.length === 0) return;
    
    const currentIndex = project.gallery.indexOf(activeImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex === project.gallery.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? project.gallery.length - 1 : currentIndex - 1;
    }
    
    setActiveImage(project.gallery[newIndex]);
  };
  
  const renderVideos = () => {
    if (!project.videos || project.videos.length === 0) {
      return null;
    }
    
    return (
      <div className="project-video-section">
        <h2>Видео проекта</h2>
        <div className="project-videos-grid">
          {project.videos.map((video, index) => (
            <div key={index} className="project-video-container">
              <video 
                className="project-video" 
                controls
                poster={video.thumbnail}
                preload="metadata"
              >
                <source src={video.path} type={video.mimeType} />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="project-detail-page">
        <Header />
        <div className="project-loading">
          <div className="loader"></div>
          <p>Загрузка проекта...</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="project-detail-page">
        <Header />
        <div className="project-error">
          <h2>Ошибка</h2>
          <p>{error || 'Проект не найден'}</p>
          <Link to="/projects" className="btn-back">
            <i className="fas fa-arrow-left"></i> Все проекты
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="project-detail-page">
      <Header />
      
      <main className="project-content">
        <div className="project-detail-container">
          <div className="project-header">
            <h1>{project.title}</h1>
            
            <div className="project-meta">
              <div className="project-meta-item">
                <span className="meta-label">Клиент:</span>
                <span className="meta-value">{project.client}</span>
              </div>
              
              <div className="project-meta-item">
                <span className="meta-label">Сфера:</span>
                <span className="meta-value">{project.industry}</span>
              </div>
              
              <div className="project-meta-item">
                <span className="meta-label">Услуга:</span>
                <span className="meta-value">{project.services}</span>
              </div>
            </div>
          </div>
          
          <div className="project-main-image-container" onClick={() => openGallery(project.coverImage)}>
            <img src={project.coverImage} alt={project.title} className="project-main-image" />
          </div>
          
          <div className="project-description">
            <p>{project.description}</p>
          </div>
          
          {renderVideos()}
          
          <div className="project-section">
            <div className="project-subsection">
              <h3>О БРЕНДЕ</h3>
              <p>{project.aboutBrand}</p>
            </div>
            
            {project.challenge && (
              <div className="project-subsection">
                <h3>ЗАДАЧА</h3>
                <p>{project.challenge}</p>
              </div>
            )}
            
            {project.solution && (
              <div className="project-subsection">
                <h3>РЕШЕНИЕ</h3>
                <p>{project.solution}</p>
              </div>
            )}
          </div>
          
          {project.gallery && project.gallery.length > 0 && (
            <div className="project-gallery-section">
              <h2>ГАЛЕРЕЯ ПРОЕКТА</h2>
              <div className="project-gallery">
                {project.gallery.map((image, index) => (
                  <div 
                    key={index} 
                    className="gallery-item"
                    onClick={() => openGallery(image)}
                  >
                    <img src={image} alt={`${project.title} - изображение ${index + 1}`} />
                    <div className="gallery-item-overlay">
                      <span><i className="fas fa-search-plus"></i></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="project-navigation">
            <Link to="/projects" className="btn-back">
              <i className="fas fa-arrow-left"></i> Все проекты
            </Link>
          </div>
        </div>
      </main>
      
      {isGalleryOpen && (
        <div className="gallery-modal">
          <button className="gallery-close" onClick={closeGallery}>
            <i className="fas fa-times"></i>
          </button>
          
          <div className="gallery-content">
            <button 
              className="gallery-nav gallery-prev" 
              onClick={() => navigateGallery('prev')}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="gallery-image-container">
              <img 
                src={activeImage} 
                alt={project.title} 
                className="gallery-image"
              />
            </div>
            
            <button 
              className="gallery-nav gallery-next" 
              onClick={() => navigateGallery('next')}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="gallery-thumbnails">
            {project.gallery.map((image, index) => (
              <div 
                key={index} 
                className={`gallery-thumbnail ${activeImage === image ? 'active' : ''}`}
                onClick={() => setActiveImage(image)}
              >
                <img src={image} alt={`Миниатюра ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;