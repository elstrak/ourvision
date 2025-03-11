// backend/routes/statsRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Временные контроллеры для статистики
const getStats = (req, res) => {
  // Заглушка, возвращает тестовые данные
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        number: '95%',
        text: 'Клиентов остаются с нами на долгосрочной основе',
        order: 1
      },
      {
        _id: '2',
        number: '120+',
        text: 'Успешно реализованных проектов',
        order: 2
      },
      {
        _id: '3',
        number: '15+',
        text: 'Лет опыта в сфере дизайна',
        order: 3
      }
    ]
  });
};

const getStat = (req, res) => {
  // Заглушка, возвращает тестовые данные для конкретной статистики
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      number: '95%',
      text: 'Клиентов остаются с нами на долгосрочной основе',
      order: 1
    }
  });
};

const createStat = (req, res) => {
  // Заглушка, имитирует создание статистики
  res.status(201).json({
    success: true,
    data: {
      _id: Date.now().toString(),
      ...req.body
    }
  });
};

const updateStat = (req, res) => {
  // Заглушка, имитирует обновление статистики
  res.json({
    success: true,
    data: {
      _id: req.params.id,
      ...req.body
    }
  });
};

const deleteStat = (req, res) => {
  // Заглушка, имитирует удаление статистики
  res.json({
    success: true,
    data: {}
  });
};

// Маршруты
router.route('/')
  .get(getStats)
  .post(protect, authorize('admin'), createStat);

router.route('/:id')
  .get(getStat)
  .put(protect, authorize('admin'), updateStat)
  .delete(protect, authorize('admin'), deleteStat);

module.exports = router;