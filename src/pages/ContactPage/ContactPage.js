// src/pages/ContactPage/ContactPage.js
import React from 'react';
import './ContactPage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import contactImage from '../../assets/images/contactimage.jpg'; // Make sure to add this image to your assets

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Header />
      <div className="contact-page-content">
        <div className="contact-page-container">
          {/* Large contact info section */}
          <div className="contact-page-main-info">
            <a href="tel:+79195781266" className="contact-phone contact-interactive">
              8-919-578-12-66
            </a>
            <a href="mailto:Offer@ourvision.pro" className="contact-email contact-interactive">
              Offer@ourvision.pro
            </a>
          </div>
          
          {/* Bottom info section */}
          <div className="contact-page-bottom-info">
            <div className="contact-info-column">
              <div className="contact-info-section">
                <h3 className="contact-info-title">Основатель</h3>
                <div className="contact-info-content">
                  <div className="contact-image-container">
                    <img src={contactImage} alt="Founder" className="contact-image" />
                  </div>
                  <p className="contact-name">Балбеков Виктор Романович</p>
                </div>
              </div>
            </div>
            
            <div className="contact-info-column">
              <div className="contact-info-section">
                <h3 className="contact-info-title">ИНН и ОГРНИП</h3>
                <p className="contact-info-text">ИП Балбеков Виктор Романович</p>
                <p className="contact-info-text">ИНН 450127496706</p>
                <p className="contact-info-text">ОГРНИП 324410000014850</p>
              </div>
            </div>
            
            <div className="contact-info-column">
              <div className="contact-info-section">
                <h3 className="contact-info-title">Адрес</h3>
                <p className="contact-info-text">Камчатский край,</p>
                <p className="contact-info-text">г. Петропавловск-Камчатский</p>
                <p className="contact-info-text">Офис: Ленинградская 33А, 5 этаж</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;