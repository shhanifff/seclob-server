import cloudinary from "../config/cloudinary.js";

export const uploadImages = async (files) => {
  const imageUrls = [];

  for (let file of files) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
    imageUrls.push(result.secure_url);
  }

  return imageUrls;
};
