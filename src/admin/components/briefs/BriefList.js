// src/admin/components/briefs/BriefList.js
import React, { useState, useEffect } from 'react';
import './BriefList.css';

const BriefList = () => {
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentBrief, setCurrentBrief] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'in-progress', 'completed'
  const [sortOrder, setSortOrder] = useState('newest');
  
  useEffect(() => {
    // Загрузка заявок из localStorage
    const loadBriefs = () => {
      setLoading(true);
      const savedBriefs = localStorage.getItem('briefs');
      const briefsData = savedBriefs ? JSON.parse(savedBriefs) : [];
      setBriefs(briefsData);
      setLoading(false);
    };
    
    loadBriefs();
  }, []);
  
  // Сохранение изменений в localStorage
  const saveBriefs = (updatedBriefs) => {
    localStorage.setItem('briefs', JSON.stringify(updatedBriefs));
    setBriefs(updatedBriefs);
  };
  
  // Открытие детального просмотра заявки
  const openBriefDetails = (brief) => {
    setCurrentBrief(brief);
  };
  
  // Закрытие детального просмотра
  const closeBriefDetails = () => {
    setCurrentBrief(null);
  };
  
  // Изменение статуса заявки
  const updateBriefStatus = (briefId, newStatus) => {
    const updatedBriefs = briefs.map(brief => 
      brief.id === briefId ? { ...brief, status: newStatus } : brief
    );
    saveBriefs(updatedBriefs);
    
    if (currentBrief && currentBrief.id === briefId) {
      setCurrentBrief({ ...currentBrief, status: newStatus });
    }
  };
  
  // Удаление заявки
  const deleteBrief = (briefId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      const updatedBriefs = briefs.filter(brief => brief.id !== briefId);
      saveBriefs(updatedBriefs);
      
      if (currentBrief && currentBrief.id === briefId) {
        closeBriefDetails();
      }
    }
  };
  
  // Получение отфильтрованных заявок
  const getFilteredBriefs = () => {
    let filteredBriefs = [...briefs];
    
    // Применяем фильтр по статусу
    if (filter !== 'all') {
      filteredBriefs = filteredBriefs.filter(brief => brief.status === filter);
    }
    
    // Сортировка по дате
    filteredBriefs.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return filteredBriefs;
  };
  
  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Получение названия статуса
  const getStatusName = (status) => {
    switch(status) {
      case 'new': return 'Новая';
      case 'in-progress': return 'В работе';
      case 'completed': return 'Завершена';
      default: return 'Неизвестно';
    }
  };
  
  // Функция для скачивания файла
  const downloadFile = (brief) => {
    if (!brief.fileData || !brief.fileName || !brief.fileType) {
      alert('Файл не найден или поврежден');
      return;
    }
    
    // Создаем Blob из Base64-данных
    const byteCharacters = atob(brief.fileData);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: brief.fileType });
    
    // Создаем временную ссылку и имитируем клик для скачивания
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = brief.fileName;
    document.body.appendChild(link);
    link.click();
    
    // Удаляем временные объекты
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  return (
    <div className="brief-list-container">
      <div className="brief-list-header">
        <h2>Список заявок</h2>
        <div className="brief-filters">
          <div className="filter-group">
            <label>Статус:</label>
            <select 
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="in-progress">В работе</option>
              <option value="completed">Завершенные</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Сортировка:</label>
            <select 
              className="filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Загрузка заявок...</div>
      ) : briefs.length === 0 ? (
        <div className="no-data">Нет доступных заявок</div>
      ) : (
        <div className="brief-table-container">
          <table className="brief-table">
            <thead>
              <tr>
                <th>Дата</th>
                <th>Имя</th>
                <th>Компания</th>
                <th>Контакт</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredBriefs().map(brief => (
                <tr 
                  key={brief.id}
                  className={brief.status === 'new' ? 'new-brief' : ''}
                >
                  <td>{formatDate(brief.date)}</td>
                  <td>{brief.name || '-'}</td>
                  <td>{brief.companyName || '-'}</td>
                  <td>
                    {brief.email || brief.phone || 
                      (brief.contactMethod === 'telegram' ? brief.telegramUsername : '-')}
                  </td>
                  <td>
                    <span className={`status-badge status-${brief.status}`}>
                      {getStatusName(brief.status)}
                    </span>
                  </td>
                  <td>
                    <div className="brief-actions">
                      <button
                        className="btn-view"
                        onClick={() => openBriefDetails(brief)}
                        title="Просмотреть детали"
                      >
                        Просмотр
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteBrief(brief.id)}
                        title="Удалить заявку"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Модальное окно с деталями заявки */}
      {currentBrief && (
        <div className="brief-modal-overlay" onClick={closeBriefDetails}>
          <div className="brief-modal" onClick={(e) => e.stopPropagation()}>
            <div className="brief-modal-header">
              <h3>Детали заявки</h3>
              <div className="brief-date">{formatDate(currentBrief.date)}</div>
              <button className="brief-modal-close" onClick={closeBriefDetails}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="brief-modal-status">
              <span>Статус:</span>
              <select 
                value={currentBrief.status}
                onChange={(e) => updateBriefStatus(currentBrief.id, e.target.value)}
                className={`status-select status-${currentBrief.status}`}
              >
                <option value="new">Новая</option>
                <option value="in-progress">В работе</option>
                <option value="completed">Завершена</option>
              </select>
            </div>
            
            <div className="brief-modal-content">
              <div className="brief-info">
                <div className="brief-info-group">
                  {currentBrief.name && (
                    <div className="brief-info-item">
                      <span className="info-label">Имя:</span>
                      <span className="info-value">{currentBrief.name}</span>
                    </div>
                  )}
                  
                  {currentBrief.companyName && (
                    <div className="brief-info-item">
                      <span className="info-label">Компания:</span>
                      <span className="info-value">{currentBrief.companyName}</span>
                    </div>
                  )}
                  
                  {currentBrief.email && (
                    <div className="brief-info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        <a href={`mailto:${currentBrief.email}`}>{currentBrief.email}</a>
                      </span>
                    </div>
                  )}
                  
                  {currentBrief.phone && (
                    <div className="brief-info-item">
                      <span className="info-label">Телефон:</span>
                      <span className="info-value">
                        <a href={`tel:${currentBrief.phone}`}>{currentBrief.phone}</a>
                      </span>
                    </div>
                  )}
                  
                  {currentBrief.contactMethod && (
                    <div className="brief-info-item">
                      <span className="info-label">Предпочтительный способ связи:</span>
                      <span className="info-value">
                        {currentBrief.contactMethod === 'phone' && 'Телефон'}
                        {currentBrief.contactMethod === 'email' && 'Email'}
                        {currentBrief.contactMethod === 'whatsapp' && 'WhatsApp'}
                        {currentBrief.contactMethod === 'telegram' && `Telegram ${currentBrief.telegramUsername ? `(@${currentBrief.telegramUsername})` : ''}`}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="brief-info-group">
                  {currentBrief.services && currentBrief.services.length > 0 && (
                    <div className="brief-info-item">
                      <span className="info-label">Интересующие услуги:</span>
                      <span className="info-value">
                        {currentBrief.services.map(service => {
                          if (service === 'other') {
                            return currentBrief.otherService || 'Другое';
                          }
                          
                          const serviceNames = {
                            strategy: 'Стратегия',
                            content: 'Контент',
                            target: 'Таргет',
                            context: 'Контекст',
                            posts: 'Посевы'
                          };
                          
                          return serviceNames[service] || service;
                        }).join(', ')}
                      </span>
                    </div>
                  )}
                  
                  {currentBrief.fileName && (
                    <div className="brief-info-item">
                      <span className="info-label">Прикрепленный файл:</span>
                      <span className="info-value">
                        {currentBrief.fileName}
                        {currentBrief.fileData && (
                          <button 
                            className="btn-download-file" 
                            onClick={() => downloadFile(currentBrief)}
                            title="Скачать файл"
                          >
                            Скачать
                          </button>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="brief-description">
                <h4>Описание проекта</h4>
                <div className="description-content">
                  {currentBrief.description || 'Нет описания'}
                </div>
              </div>
            </div>
            
            <div className="brief-modal-footer">
              <button 
                className="btn-delete-brief"
                onClick={() => deleteBrief(currentBrief.id)}
              >
                Удалить заявку
              </button>
              <button className="btn-close-brief" onClick={closeBriefDetails}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BriefList;