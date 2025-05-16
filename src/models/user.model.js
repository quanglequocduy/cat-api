const pool = require("../config/db");

// Lấy tất cả users
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
};

// Lấy user theo id
const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Lấy user theo email (phục vụ cho login)
const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

const createUser = async (username, email, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

// Cập nhật user theo id (chỉ update password và username)
const updateUser = async (id, { username, password }) => {
  const result = await pool.query(
    `UPDATE users 
     SET username = $1, password = $2, updated_at = NOW() 
     WHERE id = $3 RETURNING *`,
    [username, password, id]
  );
  return result.rows[0];
};

// Xóa user theo id
const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
