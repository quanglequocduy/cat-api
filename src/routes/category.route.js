const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  addCategory,
} = require("../controllers/category.controller");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);

module.exports = router;
