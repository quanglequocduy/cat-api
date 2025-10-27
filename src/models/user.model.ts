import pool from "../config/db.js";

// Lấy tất cả users
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
};

// Lấy user theo id
export const getUserById = async (id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

// Lấy user theo email (phục vụ cho login)
export const getUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const result = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

// Cập nhật user theo id (chỉ update password và username)
export const updateUser = async (
  id: string,
  { username, password }: { username: string; password: string }
) => {
  const result = await pool.query(
    `UPDATE users 
     SET username = $1, password = $2, updated_at = NOW() 
     WHERE id = $3 RETURNING *`,
    [username, password, id]
  );
  return result.rows[0];
};

// Xóa user theo id
export const deleteUser = async (id: string) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};
