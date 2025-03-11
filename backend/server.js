// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const statsRoutes = require('./routes/statsRoutes');
const projectRoutes = require('./routes/projectRoutes');
const jobRoutes = require('./routes/jobRoutes');
const trendRoutes = require('./routes/trendRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const jobs = require('./routes/jobs');
const teamRoutes = require('./routes/teamRoutes');

// Инициализация приложения
const app = express();

// Подключение к базе данных
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Маршруты API
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/projects', testimonialRoutes);
app.use('/api/jobs', jobs);
app.use('/api/team', teamRoutes);

// Обслуживание админ-панели в продакшене
if (process.env.NODE_ENV === 'production') {
  app.use('/admin', express.static(path.join(__dirname, 'admin/build')));
  
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/build', 'index.html'));
  });
}

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Ошибка сервера'
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));