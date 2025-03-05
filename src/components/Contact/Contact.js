import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Здесь будет логика отправки формы на сервер
    // Имитация отправки формы
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
    });
    
    // Сброс формы после успешной отправки
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Связаться с нами</h2>
        <p className="section-description text-center">
          Оставьте заявку, и мы свяжемся с вами для обсуждения вашего проекта
        </p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <h3>Телефон</h3>
                <p>+7 (999) 123-45-67</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>info@smm-studio.ru</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">🏢</div>
              <div className="info-content">
                <h3>Адрес</h3>
                <p>г. Москва, ул. Цифровая, д. 42</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">ВКонтакте</a>
              <a href="#" className="social-link">Telegram</a>
            </div>
          </div>
          
          <div className="contact-form">
            {formStatus.submitted && formStatus.success ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Сообщение отправлено!</h3>
                <p>{formStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Интересующая услуга</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Выберите услугу</option>
                    <option value="smm">SMM-продвижение</option>
                    <option value="content">Контент-маркетинг</option>
                    <option value="targeting">Таргетированная реклама</option>
                    <option value="design">Дизайн для соцсетей</option>
                    <option value="influencer">Работа с блогерами</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Сообщение *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-button">Отправить сообщение</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
