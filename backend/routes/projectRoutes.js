// backend/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject
} = require('../controllers/projectController');
const mongoose = require('mongoose');
const Project = require('../models/Project');
const path = require('path');
const fs = require('fs');

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(async (req, res) => {
    try {
      const projectId = req.params.id;
      
      // Проверка валидности ID
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Неверный формат ID проекта' });
      }
      
      // Проверка существования проекта перед удалением
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Проект не найден' });
      }
      
      // Если у проекта есть связанные файлы, удаляем их
      if (project.image) {
        const imagePath = path.join(__dirname, '../../public/uploads', path.basename(project.image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // Удаление проекта
      await Project.findByIdAndDelete(projectId);
      
      res.status(200).json({ message: 'Проект успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
      res.status(500).json({ message: 'Ошибка сервера при удалении проекта' });
    }
  });

module.exports = router;