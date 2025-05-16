const categoryModel = require("../models/category.model");

const getAllCategories = categoryModel.getAllCategories;
const getCategoryById = categoryModel.getCategoryById;
const createCategory = categoryModel.createCategory;
const updateCategory = categoryModel.updateCategory;
const deleteCategory = categoryModel.deleteCategory;

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};