const express = require("express");
const cors = require("cors");
require("dotenv").config();

const healthRoute = require("./routes/health.route");
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");
const categoryRoutes = require("./routes/category.route");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/favicon.png', (req, res) => {
  res.status(204).end();
});

app.get('/', (req, res) => {
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
