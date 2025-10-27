import express from "express";
const router = express.Router();
import authenticate from "../middlewares/auth.middleware";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", addCategory);

router.post("/", authenticate, addCategory);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
