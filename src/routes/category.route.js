const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth.middleware");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);

router.post("/", authenticate, addCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

module.exports = router;
