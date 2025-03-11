// src/admin/components/trends/CategoryList.js
import React, { useState, useEffect } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  // Используем localStorage для хранения категорий
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('trendCategories');
    return savedCategories ? JSON.parse(savedCategories) : [
      'Дизайн', 'Веб-разработка', 'Маркетинг', 'Технологии', 'Бизнес'
    ];
  });
  
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Сохраняем категории в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('trendCategories', JSON.stringify(categories));
  }, [categories]);

  // Добавление новой категории
  const addCategory = (e) => {
    e.preventDefault();
    
    if (!newCategory.trim()) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Название категории не может быть пустым'
      });
      return;
    }
    
    if (categories.includes(newCategory.trim())) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Такая категория уже существует'
      });
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    setAlert({
      show: true,
      type: 'success',
      message: 'Категория успешно добавлена'
    });
  };

  // Начало редактирования категории
  const startEditing = (category) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  // Сохранение отредактированной категории
  const saveEdit = () => {
    if (!editValue.trim()) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Название категории не может быть пустым'
      });
      return;
    }
    
    if (categories.includes(editValue.trim()) && editValue.trim() !== editingCategory) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Такая категория уже существует'
      });
      return;
    }
    
    setCategories(categories.map(cat => 
      cat === editingCategory ? editValue.trim() : cat
    ));
    
    // Обновляем категории в трендах
    const savedTrends = localStorage.getItem('trends');
    if (savedTrends) {
      const trends = JSON.parse(savedTrends);
      const updatedTrends = trends.map(trend => ({
        ...trend,
        categories: trend.categories.map(cat => 
          cat === editingCategory ? editValue.trim() : cat
        )
      }));
      localStorage.setItem('trends', JSON.stringify(updatedTrends));
    }
    
    setEditingCategory(null);
    setAlert({
      show: true,
      type: 'success',
      message: 'Категория успешно обновлена'
    });
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditingCategory(null);
  };

  // Удаление категории
  const deleteCategory = (category) => {
    if (!window.confirm(`Вы уверены, что хотите удалить категорию "${category}"?`)) {
      return;
    }
    
    setCategories(categories.filter(cat => cat !== category));
    
    // Удаляем категорию из трендов
    const savedTrends = localStorage.getItem('trends');
    if (savedTrends) {
      const trends = JSON.parse(savedTrends);
      const updatedTrends = trends.map(trend => ({
        ...trend,
        categories: trend.categories.filter(cat => cat !== category)
      }));
      localStorage.setItem('trends', JSON.stringify(updatedTrends));
    }
    
    setAlert({
      show: true,
      type: 'success',
      message: 'Категория успешно удалена'
    });
  };

  // Скрытие уведомления через 3 секунды
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <div className="category-list-container">
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
          <button 
            className="alert-close" 
            onClick={() => setAlert({ ...alert, show: false })}
          >
            &times;
          </button>
        </div>
      )}
      
      <div className="category-form">
        <h3>Добавить новую категорию</h3>
        <form onSubmit={addCategory}>
          <div className="form-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Название категории"
              required
            />
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-plus"></i> Добавить
            </button>
          </div>
        </form>
      </div>
      
      <div className="category-list">
        <h3>Список категорий</h3>
        {categories.length === 0 ? (
          <div className="no-data">Категории не найдены. Добавьте первую категорию!</div>
        ) : (
          <ul className="categories">
            {categories.map(category => (
              <li key={category} className="category-item">
                {editingCategory === category ? (
                  <div className="category-edit">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                    <div className="category-edit-actions">
                      <button className="btn-icon btn-save" onClick={saveEdit}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button className="btn-icon btn-cancel" onClick={cancelEdit}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="category-display">
                    <span className="category-name">{category}</span>
                    <div className="category-actions">
                      <button 
                        className="btn-icon btn-edit"
                        onClick={() => startEditing(category)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-delete"
                        onClick={() => deleteCategory(category)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryList;