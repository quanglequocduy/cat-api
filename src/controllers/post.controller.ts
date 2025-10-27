const postService = require("../services/post.service");

const create = async (req, res) => {
  try {
    const { title, content, category_id, status } = req.body;
    const imageUrl = req.file?.path || req.file?.url || null;

    const post = await postService.createPost({
      title,
      content,
      categoryId: category_id,
      imageUrl: imageUrl,
      userId: req.user.id,
      status: status || "draft",
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Create post failed:", err);
    res.status(500).json({ error: "Create post failed" });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch posts failed" });
  }
};

const getOne = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch post failed" });
  }
};

const getOneBySlug = async (req, res) => {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch post failed" });
  }
};

const update = async (req, res) => {
  try {
    const { title, content, category_id, status } = req.body;
    const updateData = {
      title,
      content,
      categoryId: category_id,
      status,
    };

    if (req.file && (req.file.path || req.file.url)) {
      updateData.imageUrl = req.file.path || req.file.url;
    }

    const post = await postService.updatePost(req.params.id, updateData);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update post failed" });
  }
};

const remove = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete post failed" });
  }
};

module.exports = { create, getAll, getOne, getOneBySlug, update, remove };
