import { AppDataSource } from "../config/db.js";
import { User } from "../entities/User.js";

const userRepository = AppDataSource.getRepository(User);

// Lấy tất cả users
export const getAllUsers = async () => {
  return await userRepository.find({
    order: { id: "ASC" },
  });
};

// Lấy user theo id
export const getUserById = async (id: number) => {
  return await userRepository.findOneBy({ id });
};

// Lấy user theo email (phục vụ cho login)
export const getUserByEmail = async (email: string) => {
  return await userRepository.findOneBy({ email });
};

export const createUser = async (
  username: string,
  email: string,
  hashedPassword: string
) => {
  const user = userRepository.create({
    username,
    email,
    password: hashedPassword,
  });

  const savedUser = await userRepository.save(user);
  return {
    id: savedUser.id,
    username: savedUser.username,
    email: savedUser.email,
  };
};

// Cập nhật user theo id (chỉ update password và username)
export const updateUser = async (
  id: number,
  { username, password }: { username: string; password: string }
) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) return null;

  user.username = username;
  user.password = password;

  const savedUser = await userRepository.save(user);
  return {
    id: savedUser.id,
    username: savedUser.username,
    email: savedUser.email,
  };
};

// Xóa user theo id
export const deleteUser = async (id: number) => {
  await userRepository.delete(id);
};
