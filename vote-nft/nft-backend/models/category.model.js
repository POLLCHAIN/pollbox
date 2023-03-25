const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  value: {type: Number, unique: true, index: true},
  label: String,
});

const Category = mongoose.model('categories', categorySchema);

module.exports = Category;
