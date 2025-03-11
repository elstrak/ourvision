import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamForm from './TeamForm';
import './TeamList.css';

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/team');
      setTeamMembers(response.data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке данных о команде:', err);
      setError('Не удалось загрузить данные о команде');
      
      // Если API недоступен, используем начальные данные
      setTeamMembers(getInitialTeamMembers());
    } finally {
      setIsLoading(false);
    }
  };

  // Получение начальных данных о команде
  const getInitialTeamMembers = () => {
    return [
      {
        id: 1,
        name: 'Валерия',
        position: 'Content-maker',
        image: '/assets/images/girl1.JPG',
        description: 'Валерия один из сильнейших специалистов в формате производства видео-контента в нашей команде ! Огромный опыт и педантичный подход: это точно про нее.',
        color: '#75ACDD'
      },
      {
        id: 2,
        name: 'Виктор',
        position: 'Founder & CEO',
        image: '/assets/images/vitya.JPG',
        description: 'Один из основателей агентства. Большой опыт в различных нишах и направлениях, который всегда помогает в развитии соц. сетей наших заказчиков.',
        color: '#E63623'
      },
      {
        id: 3,
        name: 'Иван',
        position: 'Founder & Designer',
        image: '/assets/images/ivan.JPG',
        description: 'Иван - настоящий гуру в дизайне ! Его основательный подход и креативное мышление упакуют Ваш профиль на все 100%',
        color: '#00A13A'
      },
      {
        id: 4,
        name: 'Ольга',
        position: 'Project Manager',
        image: '/assets/images/girl2.JPG',
        description: 'Ольга талантливый стратег: составить план продвижения, придумать коллаборации с другими предприятиями, наладить партнерские отношения - для Оли все это не проблема.',
        color: '#F7BFB9'
      }
    ];
  };

  const handleAddMember = () => {
    setCurrentMember(null);
    setIsFormVisible(true);
  };

  const handleEditMember = (member) => {
    setCurrentMember(member);
    setIsFormVisible(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого члена команды?')) {
      try {
        await axios.delete(`/api/team/${id}`);
        setTeamMembers(teamMembers.filter(member => member.id !== id));
      } catch (err) {
        console.error('Ошибка при удалении члена команды:', err);
        alert('Не удалось удалить члена команды');
      }
    }
  };

  const handleSaveMember = async (formData) => {
    try {
      let response;
      
      if (formData.get('id')) {
        // Обновление существующего члена команды
        const id = formData.get('id');
        response = await axios.put(`/api/team/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setTeamMembers(teamMembers.map(item => 
          item._id === id ? response.data : item
        ));
      } else {
        // Добавление нового члена команды
        response = await axios.post('/api/team', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setTeamMembers([...teamMembers, response.data]);
      }
      
      setIsFormVisible(false);
    } catch (err) {
      console.error('Ошибка при сохранении члена команды:', err);
      alert('Не удалось сохранить данные о члене команды');
    }
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error && teamMembers.length === 0) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="btn btn-primary" onClick={fetchTeamMembers}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="team-list-container">
      <div className="team-list-header">
        <h3>Члены команды ({teamMembers.length})</h3>
        <button 
          className="btn btn-primary" 
          onClick={handleAddMember}
        >
          Добавить члена команды
        </button>
      </div>

      {isFormVisible ? (
        <TeamForm 
          member={currentMember} 
          onSave={handleSaveMember} 
          onCancel={handleCancelForm} 
        />
      ) : (
        <div className="team-grid admin-team-grid">
          {teamMembers.map(member => (
            <div key={member._id} className="team-card">
              <div className="team-card-image">
                <img src={member.image} alt={member.name} />
                <div className="color-bar" style={{ backgroundColor: member.color }}></div>
              </div>
              <div className="team-card-content">
                <h4>{member.name}</h4>
                <p className="position" style={{ color: member.color }}>{member.position}</p>
                <p className="description">{member.description}</p>
              </div>
              <div className="team-card-actions">
                <button 
                  className="btn btn-edit" 
                  onClick={() => handleEditMember(member)}
                >
                  Редактировать
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => handleDeleteMember(member._id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamList;