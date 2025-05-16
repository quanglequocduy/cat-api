const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

router.post("/", authenticate, upload.single("image"), postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.put("/:id", authenticate, upload.single("image"), postController.update);
router.delete("/:id", authenticate, postController.remove);

module.exports = router;
