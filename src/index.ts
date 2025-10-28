import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import healthRoute from "./routes/health.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import categoryRoutes from "./routes/category.route.js";
import { AppDataSource } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.get("/favicon.png", (req, res) => {
  res.status(204).end();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CAT API" });
});

// Health check route
app.use("/api/health", healthRoute);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/ping", (req, res) => res.json({ message: "pong" }));

const PORT = 3001;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
