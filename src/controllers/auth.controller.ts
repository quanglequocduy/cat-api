import { authenticateUser, registerUser } from "../services/auth.service";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authenticateUser(email, password);
    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };
