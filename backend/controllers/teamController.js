const Team = require('../models/Team');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Получить всех членов команды
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find().sort({ createdAt: -1 });
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error('Ошибка при получении членов команды:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении членов команды' });
  }
};

// Получить одного члена команды по ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Член команды не найден' });
    }
    
    res.status(200).json(teamMember);
  } catch (error) {
    console.error('Ошибка при получении члена команды:', error);
    res.status(500).json({ message: 'Ошибка сервера при получении члена команды' });
  }
};

// Создать нового члена команды
exports.createTeamMember = async (req, res) => {
  try {
    const { name, position, description, color } = req.body;
    
    // Проверяем наличие файла изображения
    if (!req.file) {
      return res.status(400).json({ message: 'Изображение обязательно' });
    }
    
    // Генерируем уникальное имя файла
    const fileName = `${uuidv4()}_${req.file.originalname}`;
    const filePath = path.join('../public/uploads/team', fileName);
    
    // Создаем директорию, если она не существует
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Сохраняем файл
    fs.writeFileSync(filePath, req.file.buffer);
    
    // Создаем нового члена команды
    const newTeamMember = new Team({
      name,
      position,
      description,
      color,
      image: `/uploads/team/${fileName}`
    });
    
    await newTeamMember.save();
    
    res.status(201).json(newTeamMember);
  } catch (error) {
    console.error('Ошибка при создании члена команды:', error);
    res.status(500).json({ message: 'Ошибка сервера при создании члена команды' });
  }
};

// Обновить члена команды
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, position, description, color } = req.body;
    
    // Находим члена команды
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Член команды не найден' });
    }
    
    // Обновляем данные
    teamMember.name = name;
    teamMember.position = position;
    teamMember.description = description;
    teamMember.color = color;
    
    // Если есть новое изображение, обновляем его
    if (req.file) {
      // Удаляем старое изображение
      const oldImagePath = path.join('public', teamMember.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      
      // Генерируем уникальное имя файла
      const fileName = `${uuidv4()}_${req.file.originalname}`;
      const filePath = path.join('public/uploads/team', fileName);
      
      // Создаем директорию, если она не существует
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Сохраняем файл
      fs.writeFileSync(filePath, req.file.buffer);
      
      // Обновляем путь к изображению
      teamMember.image = `/uploads/team/${fileName}`;
    }
    
    await teamMember.save();
    
    res.status(200).json(teamMember);
  } catch (error) {
    console.error('Ошибка при обновлении члена команды:', error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении члена команды' });
  }
};

// Удалить члена команды
exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({ message: 'Член команды не найден' });
    }
    
    // Удаляем изображение
    const imagePath = path.join('public', teamMember.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    
    // Удаляем запись из базы данных
    await Team.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Член команды успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении члена команды:', error);
    res.status(500).json({ message: 'Ошибка сервера при удалении члена команды' });
  }
};