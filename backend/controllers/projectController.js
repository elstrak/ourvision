// controllers/projectController.js
const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// @desc    Получить все проекты
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    let query;
    
    // Копия req.query
    const reqQuery = { ...req.query };
    
    // Поля для исключения
    const removeFields = ['select', 'sort', 'page', 'limit'];
    
    // Удаление полей из reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Создание строки запроса
    let queryStr = JSON.stringify(reqQuery);
    
    // Создание операторов ($gt, $gte и т.д.)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Поиск проектов
    query = Project.find(JSON.parse(queryStr));
    
    // Выбор полей
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    // Сортировка
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Пагинация
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Project.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // Выполнение запроса
    const projects = await query;
    
    // Результат пагинации
    const pagination = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: projects.length,
      pagination,
      data: projects
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Получить один проект
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Проект не найден' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Создать проект
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    console.log('Полученные данные:', req.body); // Для отладки
    console.log('Полученные услуги:', req.body.services);
    
    // Проверяем обязательные поля
    const { title, shortDescription, description, industry } = req.body;
    
    if (!title || !shortDescription || !description || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля'
      });
    }
    
    // Проверяем, что services является массивом
    if (req.body.services && !Array.isArray(req.body.services)) {
      req.body.services = [req.body.services];
    }
    
    // Проверяем, что массив services не пустой
    if (!req.body.services || req.body.services.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, выберите хотя бы одну услугу'
      });
    }
    
    // Создаем проект
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error('Ошибка при создании проекта:', err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Обновить проект
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    console.log('Данные для обновления:', req.body); // Для отладки
    console.log('Полученные услуги:', req.body.services);
    
    // Проверяем обязательные поля
    const { title, shortDescription, description, industry } = req.body;
    
    if (!title || !shortDescription || !description || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля'
      });
    }
    
    // Проверяем, что services является массивом
    if (req.body.services && !Array.isArray(req.body.services)) {
      req.body.services = [req.body.services];
    }
    
    // Проверяем, что массив services не пустой
    if (!req.body.services || req.body.services.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, выберите хотя бы одну услугу'
      });
    }
    
    // Обновляем проект
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Проект не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error('Ошибка при обновлении проекта:', err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Удалить проект
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        error: 'Проект не найден' 
      });
    }
    
    // Удаление изображения
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Удаление проекта
    await project.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};