import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authenticate;
