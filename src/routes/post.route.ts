import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  getOneBySlug,
  getOne,
  update,
  remove,
} from "../controllers/post.controller.js";
import upload from "../middlewares/upload.js";
import authenticate from "../middlewares/auth.middleware.js";

router.post("/", authenticate, upload.single("image"), create);
router.get("/", getAll);
router.get("/slug/:slug", getOneBySlug);
router.get("/:id", getOne);
router.put("/:id", authenticate, upload.single("image"), update);
router.delete("/:id", authenticate, remove);

export default router;
