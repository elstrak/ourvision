// models/Trend.js
const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Пожалуйста, добавьте название тренда'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание тренда'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Пожалуйста, добавьте содержание тренда'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Пожалуйста, добавьте изображение тренда']
  },
  category: {
    type: String,
    required: [true, 'Пожалуйста, укажите категорию тренда'],
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trend', TrendSchema);