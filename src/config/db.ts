import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User.js";
import { Category } from "../entities/Category.js";
import { Post } from "../entities/Post.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  synchronize: false,
  entities: [User, Category, Post],
  migrations: ["src/migrations/*.ts"],
});
