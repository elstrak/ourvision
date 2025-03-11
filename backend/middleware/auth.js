// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Защита маршрутов
exports.protect = async (req, res, next) => {
  let token;
  
  // Проверка наличия токена в заголовке
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Получение токена из заголовка
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Нет доступа к этому маршруту' 
    });
  }
  
  try {
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Получение пользователя из токена
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Нет доступа к этому маршруту' 
    });
  }
};

// Проверка прав доступа
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: `Роль ${req.user.role} не имеет доступа к этому маршруту` 
      });
    }
    next();
  };
};