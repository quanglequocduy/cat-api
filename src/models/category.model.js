const pool = require("../config/db");

// Lấy tất cả categories
const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY id");
  return result.rows;
};

// Lấy categories by Id
const getCategoryById = async (id) => {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
  return result.rows[0];
};

// Tạo category mới
const createCategory = async (name) => {
  const result = await pool.query(
    "INSERT INTO categories(name) VALUES($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Cập nhật category theo id
const updateCategory = async (id, name) => {
  const result = await pool.query(
    `UPDATE categories 
     SET name = $1, updated_at = NOW() 
     WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return result.rows[0];
};

// Xóa category theo id
const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
