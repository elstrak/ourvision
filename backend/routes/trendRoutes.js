// backend/routes/trends.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Trend = require('../models/Trend');
const path = require('path');
const fs = require('fs');
const { 
  getTrends, 
  getTrend, 
  createTrend, 
  updateTrend, 
  deleteTrend 
} = require('../controllers/trendController');

// Убираем middleware protect
router.route('/')
  .get(getTrends)
  .post(createTrend);

router.route('/:id')
  .get(getTrend)
  .put(updateTrend)
  .delete(async (req, res) => {
    try {
      const trendId = req.params.id;
      
      // Проверка валидности ID
      if (!mongoose.Types.ObjectId.isValid(trendId)) {
        return res.status(400).json({ message: 'Неверный формат ID тренда' });
      }
      
      // Проверка существования тренда перед удалением
      const trend = await Trend.findById(trendId);
      if (!trend) {
        return res.status(404).json({ message: 'Тренд не найден' });
      }
      
      // Если у тренда есть изображение, удаляем его
      if (trend.image) {
        const imagePath = path.join(__dirname, '../../public/uploads', path.basename(trend.image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // Удаление тренда
      await Trend.findByIdAndDelete(trendId);
      
      res.status(200).json({ message: 'Тренд успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении тренда:', error);
      res.status(500).json({ message: 'Ошибка сервера при удалении тренда' });
    }
  });

module.exports = router;