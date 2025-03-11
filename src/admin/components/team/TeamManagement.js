import React, { useState, useEffect } from 'react';
import './TeamManagement.css';

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    description: '',
    color: '#000000',
    image: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMember(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(newMember).forEach(key => {
      formData.append(key, newMember[key]);
    });

    try {
      const url = isEditing ? `/api/team/${editingId}` : '/api/team';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData
      });

      if (response.ok) {
        fetchTeamMembers();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await fetch(`/api/team/${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          fetchTeamMembers();
        }
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleEdit = (member) => {
    setNewMember({
      name: member.name,
      position: member.position,
      description: member.description,
      color: member.color,
      image: member.image
    });
    setIsEditing(true);
    setEditingId(member.id);
  };

  const resetForm = () => {
    setNewMember({
      name: '',
      position: '',
      description: '',
      color: '#000000',
      image: null
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="team-management">
      <h2>Team Management</h2>
      
      <form onSubmit={handleSubmit} className="team-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newMember.name}
            onChange={(e) => setNewMember(prev => ({...prev, name: e.target.value}))}
            required
          />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            value={newMember.position}
            onChange={(e) => setNewMember(prev => ({...prev, position: e.target.value}))}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={newMember.description}
            onChange={(e) => setNewMember(prev => ({...prev, description: e.target.value}))}
            required
          />
        </div>

        <div className="form-group">
          <label>Color:</label>
          <input
            type="color"
            value={newMember.color}
            onChange={(e) => setNewMember(prev => ({...prev, color: e.target.value}))}
          />
        </div>

        <div className="form-group">
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!isEditing}
          />
        </div>

        <div className="form-actions">
          <button type="submit">{isEditing ? 'Update' : 'Add'} Team Member</button>
          {isEditing && (
            <button type="button" onClick={resetForm}>Cancel</button>
          )}
        </div>
      </form>

      <div className="team-list">
        {teamMembers.map(member => (
          <div key={member.id} className="team-item">
            <img src={member.image} alt={member.name} />
            <div className="team-item-info">
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
            <div className="team-item-actions">
              <button onClick={() => handleEdit(member)}>Edit</button>
              <button onClick={() => handleDelete(member.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;