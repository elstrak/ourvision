// backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();

// Временный контроллер для подсчета вакансий
const getJobsCount = (req, res) => {
  // Заглушка, возвращает фиксированное значение
  res.json({ success: true, count: 0 });
};

// Маршрут для получения количества вакансий
router.get('/count', getJobsCount);

module.exports = router;