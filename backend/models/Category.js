// backend/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Пожалуйста, добавьте название'],
    trim: true,
    maxlength: [50, 'Название не может быть длиннее 50 символов']
  },
  type: {
    type: String,
    required: [true, 'Пожалуйста, укажите тип категории'],
    enum: ['industry', 'service'],
    default: 'industry'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);