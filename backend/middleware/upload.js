// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Настройка хранилища
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Проверка типа файла
const fileFilter = (req, file, cb) => {
  // Разрешенные типы файлов
  const filetypes = /jpeg|jpg|png|gif/;
  
  // Проверка расширения
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  // Проверка MIME-типа
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Ошибка: Разрешены только изображения!');
  }
};

// Инициализация загрузки
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter
});

module.exports = upload;