// auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/user.model.js";

const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (!username || !email || !password) {
    throw new Error("All fields (username, email, password) are required");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(username, email, hashedPassword);
};

const authenticateUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return { token };
};

module.exports = { registerUser, authenticateUser };
