import postService from "../services/post.service.js";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content, category_id, status } = req.body;
    const imageUrl = req.file?.path || null;

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

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch posts failed" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const post = await postService.getPostById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch post failed" });
  }
};

export const getOneBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: "Post slug is required" });
    }

    const post = await postService.getPostBySlug(slug);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch post failed" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category_id, status } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const updateData: any = {
      title,
      content,
      categoryId: category_id,
      status,
    };

    if (req.file && req.file.path) {
      updateData.imageUrl = req.file.path;
    }

    const post = await postService.updatePost(id, updateData);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update post failed" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    await postService.deletePost(id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete post failed" });
  }
};
