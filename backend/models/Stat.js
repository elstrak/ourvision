const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Пожалуйста, укажите число']
  },
  text: {
    type: String,
    required: [true, 'Пожалуйста, добавьте описание']
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Stat', StatSchema);
