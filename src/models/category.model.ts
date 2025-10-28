import { AppDataSource } from "../config/db.js";
import { Category } from "../entities/Category.js";

const categoryRepository = AppDataSource.getRepository(Category);

// Lấy tất cả categories
export const getAllCategories = async () => {
  return await categoryRepository.find({
    order: { id: "ASC" },
  });
};

// Lấy categories by Id
export const getCategoryById = async (id: number) => {
  return await categoryRepository.findOne({
    where: { id },
  });
};

// Tạo category mới
export const createCategory = async (name: string) => {
  const category = categoryRepository.create({ name });
  return await categoryRepository.save(category);
};

// Cập nhật category theo id
export const updateCategory = async (id: number, name: string) => {
  const category = await categoryRepository.findOneBy({ id });
  if (!category) return null;

  category.name = name;
  return await categoryRepository.save(category);
};

// Xóa category theo id
export const deleteCategory = async (id: number) => {
  return await categoryRepository.delete({ id });
};
