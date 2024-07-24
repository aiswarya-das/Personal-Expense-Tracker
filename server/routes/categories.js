const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Get categories
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add category
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ user: req.user.id, name });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete category
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });
    if (category.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await category.remove();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update category
router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ msg: 'Category not found' });
    if (category.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    category.name = name;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
