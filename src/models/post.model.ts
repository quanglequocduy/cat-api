import { AppDataSource } from "../config/db.js";
import { Category } from "../entities/Category.js";
import { Post } from "../entities/Post.js";

import slugify from "slugify";
import { User } from "../entities/User.js";

const postRepository = AppDataSource.getRepository(Post);
const categoryRepository = AppDataSource.getRepository(Category);
const userRepository = AppDataSource.getRepository(User);

// Tạo bài viết mới, thêm categoryId và imageUrl vào
export const createPost = async ({
  title,
  content,
  userId,
  categoryId = null,
  imageUrl = null,
  status = "draft",
}: {
  title: string;
  content: string;
  userId: number;
  categoryId?: number | null;
  imageUrl?: string | null;
  status?: string;
}) => {
  // @ts-ignore
  const slug = slugify(title, { lower: true, strict: true });

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const category = categoryId
    ? await categoryRepository.findOneBy({ id: categoryId })
    : null;

  const post = postRepository.create({
    title,
    slug,
    content,
    author: user,
    category,
    image_url: imageUrl,
    status,
  });

  return await postRepository.save(post);
};

// Lấy tất cả bài viết
export const getAllPosts = async () => {
  return await postRepository.find({
    order: { created_at: "DESC" },
  });
};

// Lấy bài viết theo id
export const getPostById = async (id: number) => {
  return await postRepository.findOne({
    where: { id },
  });
};

// Lấy bài viết theo slug
export const getPostBySlug = async (slug: string) => {
  return await postRepository.findOne({
    where: { slug },
  });
};

// Cập nhật bài viết, có thể cập nhật category và imageUrl luôn
export const updatePost = async (
  id: number,
  {
    title,
    content,
    categoryId,
    imageUrl,
    status,
  }: {
    title: string;
    content: string;
    categoryId?: number;
    imageUrl?: string;
    status?: string;
  }
) => {
  const post = await postRepository.findOneBy({ id });
  if (!post) return null;

  // @ts-ignore
  const slug = slugify(title, { lower: true, strict: true });

  post.title = title;
  post.slug = slug;
  post.content = content;

  if (categoryId) {
    const category = await categoryRepository.findOneBy({
      id: categoryId,
    });
    post.category = category || null;
  }

  if (imageUrl) post.image_url = imageUrl;
  if (status) post.status = status;

  return await postRepository.save(post);
};

// Xóa bài viết theo id
export const deletePost = async (id: number) => {
  await postRepository.delete(id);
};
