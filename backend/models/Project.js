// models/Project.js
const mongoose = require('mongoose');

// Схема для отзывов
const TestimonialSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Текст отзыва обязателен'],
    trim: true
  },
  contactInfo: {
    type: String,
    required: [true, 'Контактная информация обязательна'],
    trim: true
  },
  relatedProjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Пожалуйста, добавьте название проекта'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  shortDescription: {
    type: String,
    required: [true, 'Пожалуйста, добавьте краткое описание'],
    trim: true,
    maxlength: [200, 'Краткое описание не может быть длиннее 200 символов']
  },
  description: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание проекта'],
    trim: true
  },
  aboutBrand: {
    type: String,
    required: [true, 'Пожалуйста, добавьте информацию о бренде'],
    trim: true
  },
  challenge: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание задачи'],
    trim: true
  },
  solution: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание решения'],
    trim: true
  },
  industry: {
    type: String,
    required: [true, 'Пожалуйста, укажите сферу деятельности']
  },
  services: {
    type: [String],
    required: [true, 'Пожалуйста, укажите предоставленные услуги']
  },
  client: {
    type: String,
    required: [true, 'Пожалуйста, укажите клиента'],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  coverImage: {
    type: String,
    required: [true, 'Пожалуйста, добавьте URL обложки']
  },
  gallery: {
    type: [String],
    default: []
  },
  videos: [{
    path: String,
    originalName: String,
    mimeType: String,
    size: Number,
    thumbnail: String
  }],
  testimonials: {
    type: [TestimonialSchema],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);