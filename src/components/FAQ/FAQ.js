import React, { useState } from 'react';
import './FAQ.css';
import videoBackground from '../../assets/videos/about.mp4'; // Замените на путь к вашему видео из assets

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqItems = [
    {
      id: 1,
      question: 'В каком городе вы работаете?',
      answer: 'Основная часть нашей команды находится в Петропавловске-Камчатском, но есть и члены команды из других регионов и даже стран. Нужен SMM, дизайн или сайт — пишите с любой точки планеты.'
    },
    {
      id: 2,
      question: 'С какими нишами вы работаете?',
      answer: 'Мы работаем с абсолютно разными нишами. В первую очередь мы изучаем рынок и составляем портреты Целевой Аудитории, что помогает нам подобрать лучший подход для продвижения Вашего бренда. Свяжитесь с нами, чтобы рассказать о Вашем бизнесе.'
    },
    {
      id: 3,
      question: 'Как я смогу отслеживать вашу работу?',
      answer: 'В нашей работе результат — налицо. Но мы все равно регулярно отправляем отчетность и держим вас в курсе запланированных и осуществленных этапов.'
    },
    {
      id: 4,
      question: 'Чего можно добиться от SMM?',
      answer: 'Лояльной аудитории, дополнительного касания, увеличения продаж, повышение присутствия бренда, локального продвижения, увеличения количества заявок и звонков, посетителей на сайт, увеличение репутации и доверия, принципиально нового качества трафик.'
    }
  ];

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        
        <div className="faq-container">
          <div className="faq-media">
            <div className="faq-video-container">
              <video autoPlay loop muted className="faq-video">
                <source src={videoBackground} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
          </div>
          
          <div className="faq-content">
            <div className="faq-questions">
              {faqItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`faq-item ${activeQuestion === item.id ? 'active' : ''}`}
                >
                  <div 
                    className="faq-question" 
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <h3>{item.question}</h3>
                    <span className="faq-toggle">
                      {activeQuestion === item.id ? '−' : '+'}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="faq-contact-text">
              Остались вопросы?
              <a href="/contact" className="faq-contact-link"> Свяжитесь с нами</a> для получения помощи
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;