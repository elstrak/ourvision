// backend/models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Пожалуйста, добавьте название вакансии'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  location: {
    type: String,
    required: [true, 'Пожалуйста, укажите локацию'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Пожалуйста, укажите тип работы'],
    enum: [
      'Полная занятость',
      'Частичная занятость',
      'Проектная работа',
      'Стажировка',
      'Удаленная работа'
    ]
  },
  department: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  shortDescription: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание вакансии'],
    trim: true
  },
  requirements: {
    type: [String],
    default: []
  },
  responsibilities: {
    type: [String],
    default: []
  },
  benefits: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);