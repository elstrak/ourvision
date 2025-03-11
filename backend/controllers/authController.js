// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Аутентификация пользователя и получение токена
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка существования пользователя
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Неверные учетные данные'
      });
    }

    // Создание токена
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Удаление пароля из ответа
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Получение текущего пользователя
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
};

// @desc    Выход пользователя
// @route   GET /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    data: {}
  });
};