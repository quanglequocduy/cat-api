import pool from "../config/db.js";
import slugify from "slugify";

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
  userId: string;
  categoryId?: string | null;
  imageUrl?: string | null;
  status?: string;
}) => {
  // @ts-ignore
  const slug = slugify(title, { lower: true, strict: true });

  const result = await pool.query(
    `INSERT INTO posts (title, slug, content, author_id, category_id, image_url, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, slug, content, userId, categoryId, imageUrl, status]
  );
  return result.rows[0];
};

// Lấy tất cả bài viết
export const getAllPosts = async () => {
  let query = "SELECT * FROM posts ORDER BY created_at DESC";

  const result = await pool.query(query);
  return result.rows;
};

// Lấy bài viết theo id
export const getPostById = async (id: string) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0];
};

// Lấy bài viết theo slug
export const getPostBySlug = async (slug: string) => {
  const result = await pool.query("SELECT * FROM posts WHERE slug = $1", [
    slug,
  ]);
  return result.rows[0];
};

// Cập nhật bài viết, có thể cập nhật category và imageUrl luôn
export const updatePost = async (
  id: string,
  {
    title,
    content,
    categoryId,
    imageUrl,
    status,
  }: {
    title: string;
    content: string;
    categoryId: string | null;
    imageUrl?: string | null;
    status?: string;
  }
) => {
  // @ts-ignore
  const slug = slugify(title, { lower: true, strict: true });

  // Xây dựng query động
  let query = `UPDATE posts SET title = $1, slug = $2, content = $3, category_id = $4`;
  const params = [title, slug, content, categoryId, id];
  let paramIndex = 5;

  if (imageUrl !== undefined) {
    query += `, image_url = $${paramIndex}`;
    params.splice(paramIndex - 1, 0, imageUrl);
    paramIndex++;
  }

  if (status !== undefined) {
    query += `, status = $${paramIndex}`;
    params.splice(paramIndex - 1, 0, status);
    paramIndex++;
  }

  query += `, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;

  const result = await pool.query(query, params);
  return result.rows[0];
};

// Xóa bài viết theo id
export const deletePost = async (id: string) => {
  await pool.query("DELETE FROM posts WHERE id = $1", [id]);
};
