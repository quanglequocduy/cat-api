import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import healthRoute from "./routes/health.route";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import categoryRoutes from "./routes/category.route";

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
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
