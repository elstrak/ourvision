// backend/controllers/jobController.js
const Job = require('../models/Job');

// @desc    Получить все вакансии
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    console.error('Ошибка при получении вакансий:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Получить одну вакансию
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error('Ошибка при получении вакансии:', err);
    
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Создать вакансию
// @route   POST /api/jobs
// @access  Private
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    
    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error('Ошибка при создании вакансии:', err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Обновить вакансию
// @route   PUT /api/jobs/:id
// @access  Private
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    console.error('Ошибка при обновлении вакансии:', err);
    
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Удалить вакансию
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    await job.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Ошибка при удалении вакансии:', err);
    
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Вакансия не найдена'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};