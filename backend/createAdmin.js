// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Определение схемы пользователя (должна соответствовать вашей модели User)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

// Создание администратора
const createAdmin = async () => {
  try {
    // Проверка, существует ли уже администратор
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('Администратор уже существует');
      process.exit(0);
    }
    
    // Создание нового администратора
    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    
    console.log('Администратор успешно создан');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
    process.exit(1);
  }
};

createAdmin();