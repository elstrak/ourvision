const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/videos');
    
    // Создаем директорию, если она не существует
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// Фильтр файлов для видео
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый формат файла. Разрешены только MP4, WebM, MOV и AVI.'), false);
  }
};

// Настройка загрузки
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 МБ
  }
});

// Функция для создания миниатюры видео
const createVideoThumbnail = (videoPath, thumbnailPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        count: 1,
        folder: path.dirname(thumbnailPath),
        filename: path.basename(thumbnailPath),
        size: '320x240'
      })
      .on('end', () => resolve(thumbnailPath))
      .on('error', (err) => reject(err));
  });
};

// Маршрут для загрузки видео
router.post('/videos', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Файл не был загружен'
      });
    }
    
    const videoPath = req.file.path;
    const thumbnailName = `${path.parse(req.file.filename).name}.jpg`;
    const thumbnailDir = path.join(__dirname, '../uploads/thumbnails');
    
    // Создаем директорию для миниатюр, если она не существует
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }
    
    const thumbnailPath = path.join(thumbnailDir, thumbnailName);
    
    // Создаем миниатюру
    try {
      await createVideoThumbnail(videoPath, thumbnailPath);
    } catch (err) {
      console.error('Ошибка при создании миниатюры:', err);
      // Продолжаем без миниатюры, если произошла ошибка
    }
    
    // Формируем пути для фронтенда
    const videoUrl = `/uploads/videos/${req.file.filename}`;
    const thumbnailUrl = `/uploads/thumbnails/${thumbnailName}`;
    
    res.status(200).json({
      success: true,
      data: {
        path: videoUrl,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        thumbnail: thumbnailUrl
      }
    });
  } catch (err) {
    console.error('Ошибка при загрузке видео:', err);
    res.status(500).json({
      success: false,
      error: 'Ошибка при загрузке видео'
    });
  }
});

module.exports = router;