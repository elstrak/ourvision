// backend/controllers/trendController.js
const Trend = require('../models/Trend');
const path = require('path');
const fs = require('fs');

// @desc    Получить все тренды
// @route   GET /api/trends
// @access  Public
exports.getTrends = async (req, res) => {
  try {
    const trends = await Trend.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: trends.length,
      data: trends
    });
  } catch (err) {
    console.error('Ошибка при получении трендов:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Получить один тренд
// @route   GET /api/trends/:id
// @access  Public
exports.getTrend = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);
    
    if (!trend) {
      return res.status(404).json({
        success: false,
        error: 'Тренд не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      data: trend
    });
  } catch (err) {
    console.error('Ошибка при получении тренда:', err);
    
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Тренд не найден'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Создать тренд
// @route   POST /api/trends
// @access  Public
exports.createTrend = async (req, res) => {
  try {
    // Удаляем _id из тела запроса при создании нового тренда
    const { _id, ...trendData } = req.body;
    
    const trend = await Trend.create(trendData);
    
    res.status(201).json({
      success: true,
      data: trend
    });
  } catch (err) {
    console.error('Ошибка при создании тренда:', err);
    
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

// @desc    Обновить тренд
// @route   PUT /api/trends/:id
// @access  Public
exports.updateTrend = async (req, res) => {
  try {
    // Проверяем, что id не undefined
    if (!req.params.id || req.params.id === 'undefined') {
      return res.status(400).json({
        success: false,
        error: 'ID тренда не определен'
      });
    }
    
    // Удаляем _id из тела запроса, чтобы избежать конфликта с MongoDB
    const { _id, ...updateData } = req.body;
    
    const trend = await Trend.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!trend) {
      return res.status(404).json({
        success: false,
        error: 'Тренд не найден'
      });
    }
    
    res.status(200).json({
      success: true,
      data: trend
    });
  } catch (err) {
    console.error('Ошибка при обновлении тренда:', err);
    
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
        error: 'Тренд не найден или неверный формат ID'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Удалить тренд
// @route   DELETE /api/trends/:id
// @access  Public
exports.deleteTrend = async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);
    
    if (!trend) {
      return res.status(404).json({ 
        success: false, 
        error: 'Тренд не найден' 
      });
    }
    
    // Удаление изображения, если оно есть
    if (trend.image) {
      const imagePath = path.join(__dirname, '../../public/uploads', path.basename(trend.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Удаление тренда
    await Trend.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Тренд успешно удален'
    });
  } catch (error) {
    console.error('Ошибка при удалении тренда:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка сервера при удалении тренда' 
    });
  }
};

// @desc    Получить количество трендов
// @route   GET /api/trends/count
// @access  Public
exports.getTrendsCount = async (req, res) => {
  try {
    const count = await Trend.countDocuments();
    
    res.status(200).json({
      success: true,
      count
    });
  } catch (err) {
    console.error('Ошибка при получении количества трендов:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};