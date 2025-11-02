import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "cat_uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as any,
});

const upload = multer({ storage });

export default upload;
