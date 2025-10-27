import pool from "../config/db.js";

// Lấy tất cả categories
export const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
};

// Lấy categories by Id
export const getCategoryById = async (id: string) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Tạo category mới
export const createCategory = async (name: string) => {
  const result = await pool.query(
    "INSERT INTO categories(name) VALUES($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Cập nhật category theo id
export const updateCategory = async (id: string, name: string) => {
  const result = await pool.query(
    `UPDATE categories 
     SET name = $1, updated_at = NOW() 
     WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return result.rows[0];
};

// Xóa category theo id
export const deleteCategory = async (id: string) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};
