const categoryService = require("../services/category.service");

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error getting categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Error getting category by id:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
};
