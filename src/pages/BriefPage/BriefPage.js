import React, { useState, useRef } from 'react';
import './BriefPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import phoneIcon from '../../assets/icon-phone.svg';
import emailIcon from '../../assets/icon-email.svg';
import whatsappIcon from '../../assets/icon-whatsapp.svg';
import telegramIcon from '../../assets/icon-telegram.svg';

const BriefPage = () => {
  const [formData, setFormData] = useState({
    services: [],
    otherService: '',
    companyName: '',
    name: '',
    phone: '',
    email: '',
    description: '',
    contactMethod: '',
    telegramUsername: '',
    file: null
  });
  
  const [focusedFields, setFocusedFields] = useState({});
  const fileInputRef = useRef(null);
  
  const services = [
    { id: 'strategy', label: 'Стратегия' },
    { id: 'content', label: 'Контент' },
    { id: 'target', label: 'Таргет' },
    { id: 'context', label: 'Контекст' },
    { id: 'posts', label: 'Посевы' },
    { id: 'other', label: 'Другое' }
  ];
  
  const contactMethods = [
    { id: 'phone', label: 'Телефон', icon: phoneIcon },
    { id: 'email', label: 'Email', icon: emailIcon },
    { id: 'whatsapp', label: 'WhatsApp', icon: whatsappIcon },
    { id: 'telegram', label: 'Telegram', icon: telegramIcon }
  ];
  
  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const newServices = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
      
      return { ...prev, services: newServices };
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactMethodSelect = (methodId) => {
    setFormData(prev => ({ ...prev, contactMethod: methodId }));
  };
  
  const handleFocus = (fieldName) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: true }));
  };
  
  const handleBlur = (fieldName) => {
    setFocusedFields(prev => ({ ...prev, [fieldName]: false }));
  };
  
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files[0] }));
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Здесь будет логика отправки формы на сервер
    alert('Заявка отправлена!');
  };
  
  return (
    <div className="brief-page">
      <Header />
      <div className="brief-content">
        <div className="brief-container">
          <h1 className="brief-title">
            Поможем сделать<br />
            эффективный <span className="highlight">SMM</span>
          </h1>
          
          <form className="brief-form" onSubmit={handleSubmit}>
            <div className="services-section">
              <label className="services-label">Какие услуги интересуют</label>
              <div className="services-options">
                {services.map(service => (
                  <div key={service.id} className="service-option-wrapper">
                    <button
                      type="button"
                      className={`service-option ${formData.services.includes(service.id) ? 'selected' : ''}`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      {service.label}
                    </button>
                    {service.id === 'other' && formData.services.includes('other') && (
                      <input
                        type="text"
                        name="otherService"
                        value={formData.otherService}
                        onChange={handleInputChange}
                        className={`other-service-input ${focusedFields.otherService ? 'focused' : ''}`}
                        placeholder="Укажите услугу"
                        onFocus={() => handleFocus('otherService')}
                        onBlur={() => handleBlur('otherService')}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-fields">
              <div className="form-field">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`form-input ${focusedFields.companyName ? 'focused' : ''}`}
                  placeholder="Название компании"
                  onFocus={() => handleFocus('companyName')}
                  onBlur={() => handleBlur('companyName')}
                />
              </div>
              
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${focusedFields.name ? 'focused' : ''}`}
                  placeholder="Ваше имя"
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                />
              </div>
              
              <div className="form-field">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${focusedFields.phone ? 'focused' : ''}`}
                  placeholder="Телефон"
                  onFocus={() => handleFocus('phone')}
                  onBlur={() => handleBlur('phone')}
                />
              </div>
              
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${focusedFields.email ? 'focused' : ''}`}
                  placeholder="Почта"
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
              </div>
            </div>
            
            <div className="description-upload-row">
              <div className="form-field description-field">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`form-textarea ${focusedFields.description ? 'focused' : ''}`}
                  placeholder="Опишите задачи для агентства"
                  onFocus={() => handleFocus('description')}
                  onBlur={() => handleBlur('description')}
                  rows="4"
                ></textarea>
              </div>
              
              <div className="file-upload">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="upload-button"
                  onClick={triggerFileInput}
                >
                  Загрузите бриф
                </button>
                {formData.file && (
                  <span className="file-name">{formData.file.name}</span>
                )}
              </div>
            </div>
            
            <div className="form-footer">
              <div className="contact-method-container">
                <label className="contact-method-label">Предпочтительный способ связи</label>
                <div className="contact-methods-wrapper">
                  <div className="contact-methods">
                    {contactMethods.map(method => (
                      <div key={method.id} className="contact-method-wrapper">
                        <button
                          type="button"
                          className={`contact-method-button ${formData.contactMethod === method.id ? 'selected' : ''}`}
                          onClick={() => handleContactMethodSelect(method.id)}
                        >
                          <img src={method.icon} alt={method.label} className="contact-method-icon" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="telegram-field-container">
                    {formData.contactMethod === 'telegram' && (
                      <input
                        type="text"
                        name="telegramUsername"
                        value={formData.telegramUsername}
                        onChange={handleInputChange}
                        className={`telegram-input ${focusedFields.telegramUsername ? 'focused' : ''}`}
                        placeholder="никнейм в TG"
                        onFocus={() => handleFocus('telegramUsername')}
                        onBlur={() => handleBlur('telegramUsername')}
                      />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="consent-section">
                <p className="consent-text">
                  Нажимая на кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с 
                  <a href="/privacy" className="consent-link"> политикой конфиденциальности</a>
                </p>
              </div>
              
              <button type="submit" className="submit-button">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BriefPage;
