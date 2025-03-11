// src/components/LightboxModal/LightboxModal.js
import React, { useState, useEffect } from 'react';
import './LightboxModal.css';

const LightboxModal = ({ images, currentIndex, onClose }) => {
  const [index, setIndex] = useState(currentIndex || 0);
  
  // Закрытие лайтбокса при нажатии ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'ArrowRight') {
        showNextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    // Блокируем скролл на странице при открытом лайтбоксе
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Возвращаем скролл при закрытии
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  const showPrevImage = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const showNextImage = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          &times;
        </button>
        
        <div className="lightbox-image-container">
          <img 
            src={images[index]} 
            alt={`Изображение ${index + 1}`} 
            className="lightbox-image"
          />
        </div>
        
        <div className="lightbox-counter">
          {index + 1} / {images.length}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={showPrevImage}
              aria-label="Предыдущее изображение"
            >
              &#10094;
            </button>
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={showNextImage}
              aria-label="Следующее изображение"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;