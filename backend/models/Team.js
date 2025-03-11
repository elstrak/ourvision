const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    default: '#000000'
  },
  image: {
    type: String,
    required: true
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

// Обновляем дату изменения перед сохранением
teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;