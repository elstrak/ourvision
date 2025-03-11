const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
// Удаляем импорт middleware
// const { protect, authorize } = require('../middleware/auth');
const mongoose = require('mongoose');

// @desc    Добавить отзыв к проекту
// @route   POST /api/projects/:projectId/testimonials
// @access  Public
router.post('/:projectId/testimonials', async (req, res) => {
  try {
    const { text, contactInfo, relatedProjectId } = req.body;
    
    if (!text || !contactInfo) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля'
      });
    }
    
    // Проверка существования проекта
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Проект не найден'
      });
    }
    
    // Проверка существования связанного проекта, если указан
    if (relatedProjectId) {
      const relatedProject = await Project.findById(relatedProjectId);
      if (!relatedProject) {
        return res.status(400).json({
          success: false,
          error: 'Связанный проект не найден'
        });
      }
    }
    
    // Создание нового отзыва
    const newTestimonial = {
      text,
      contactInfo,
      relatedProjectId: relatedProjectId || null
    };
    
    // Добавление отзыва к проекту
    project.testimonials.push(newTestimonial);
    await project.save();
    
    res.status(201).json({
      success: true,
      data: project.testimonials[project.testimonials.length - 1]
    });
  } catch (err) {
    console.error('Ошибка при добавлении отзыва:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// @desc    Получить все отзывы проекта
// @route   GET /api/projects/:projectId/testimonials
// @access  Public
router.get('/:projectId/testimonials', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Проект не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      count: project.testimonials.length,
      data: project.testimonials
    });
  } catch (err) {
    console.error('Ошибка при получении отзывов:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// @desc    Удалить отзыв
// @route   DELETE /api/projects/:projectId/testimonials/:testimonialId
// @access  Public
router.delete('/:projectId/testimonials/:testimonialId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Проект не найден'
      });
    }
    
    // Находим индекс отзыва для удаления
    const testimonialIndex = project.testimonials.findIndex(
      testimonial => testimonial._id.toString() === req.params.testimonialId
    );
    
    if (testimonialIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Отзыв не найден'
      });
    }
    
    // Удаляем отзыв из массива
    project.testimonials.splice(testimonialIndex, 1);
    await project.save();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Ошибка при удалении отзыва:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// @desc    Обновить отзыв
// @route   PUT /api/projects/:projectId/testimonials/:testimonialId
// @access  Public
router.put('/:projectId/testimonials/:testimonialId', async (req, res) => {
  try {
    const { text, contactInfo, relatedProjectId } = req.body;
    
    if (!text || !contactInfo) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля'
      });
    }
    
    const project = await Project.findById(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Проект не найден'
      });
    }
    
    // Проверка существования связанного проекта, если указан
    if (relatedProjectId) {
      const relatedProject = await Project.findById(relatedProjectId);
      if (!relatedProject) {
        return res.status(400).json({
          success: false,
          error: 'Связанный проект не найден'
        });
      }
    }
    
    // Находим отзыв для обновления
    const testimonialIndex = project.testimonials.findIndex(
      testimonial => testimonial._id.toString() === req.params.testimonialId
    );
    
    if (testimonialIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Отзыв не найден'
      });
    }
    
    // Обновляем отзыв
    project.testimonials[testimonialIndex] = {
      ...project.testimonials[testimonialIndex].toObject(),
      text,
      contactInfo,
      relatedProjectId: relatedProjectId || null
    };
    
    await project.save();
    
    res.status(200).json({
      success: true,
      data: project.testimonials[testimonialIndex]
    });
  } catch (err) {
    console.error('Ошибка при обновлении отзыва:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

module.exports = router;