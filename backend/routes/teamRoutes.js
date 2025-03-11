const express = require('express');
const router = express.Router();
const multer = require('multer');
const teamController = require('../controllers/teamController');

// Настройка multer для загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 5MB
  }
});

// Получить всех членов команды (публичный доступ)
router.get('/', teamController.getAllTeamMembers);

// Получить одного члена команды по ID (публичный доступ)
router.get('/:id', teamController.getTeamMemberById);

// Создать нового члена команды
router.post('/', upload.single('imageFile'), teamController.createTeamMember);

// Обновить члена команды
router.put('/:id', upload.single('imageFile'), teamController.updateTeamMember);

// Удалить члена команды
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;