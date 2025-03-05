import React, { useState } from 'react';
import './Industries.css';
import logo from '../../assets/images/logo.svg';

const Industries = () => {
  const [activeIndustry, setActiveIndustry] = useState('services');
  
  const industries = [
    { id: 'mobile', name: 'Мобильные операторы' },
    { id: 'goods', name: 'Товары' },
    { id: 'services', name: 'Услуги' },
    { id: 'education', name: 'Образование' },
    { id: 'developers', name: 'Девелоперы' },
    { id: 'fmcg', name: 'FMCG' },
    { id: 'pharma', name: 'Фарма и медицинские услуги' }
  ];
  
  const clients = [
    { id: 1, name: 'Drivee', logo: logo },
    { id: 2, name: 'Yota', logo: logo },
    { id: 3, name: 'Red Wings', logo: logo },
    { id: 4, name: 'Полисорб', logo: logo },
    { id: 5, name: 'МегаФон', logo: logo }
  ];

  return (
    <section className="industries">
      <div className="container">
        <div className="industries-tabs">
          {industries.map(industry => (
            <button 
              key={industry.id}
              className={`industry-tab ${activeIndustry === industry.id ? 'active' : ''}`}
              onClick={() => setActiveIndustry(industry.id)}
            >
              {industry.name}
            </button>
          ))}
        </div>
        
        <div className="clients-grid">
          {clients.map(client => (
            <div className="client-item" key={client.id}>
              <img src={client.logo} alt={client.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;