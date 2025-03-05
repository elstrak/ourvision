import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      number: '2000',
      text: 'Реализованных рекламных кампаний'
    },
    {
      number: '200',
      text: 'Федеральных и региональных клиентов'
    },
    {
      number: '40',
      text: 'Сотрудников в агентстве'
    },
    {
      number: '2,5',
      text: 'Средний срок сотрудничества с клиентом'
    },
    {
      number: '8',
      text: 'Лет лидируем в сфере digital'
    }
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-text">{stat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;