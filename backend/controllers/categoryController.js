// backend/controllers/categoryController.js
const Category = require('../models/Category');

// Получить все категории (сферы и услуги)
exports.getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    
    if (type) {
      query.type = type;
    }
    
    const categories = await Category.find(query).sort('name');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Получить одну категорию
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Категория не найдена' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Создать категорию
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Обновить категорию
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Категория не найдена' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Удалить категорию
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Категория не найдена' 
      });
    }
    
    await category.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};