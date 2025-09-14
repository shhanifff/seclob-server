import mongoose from "mongoose";
import Category from "../model/cateModel.js";
import Products from "../model/productModel.js";
import { uploadImages } from "../untils/uploadToCloudinary.js";

export const addProduct = async (req, res) => {
  console.log(req.body);
  const {
    title,
    category,
    subCategory,
    description,
    variants,
  } = req.body;

  if (!req.files) {
    return res.status(400).json({ message: "Images are required" });
  }

  if (!req.body) {
    return res.status(400).json({ message: "fields are required" });
  }

  console.log("variants from frontend", variants);

  const imageUrls = await uploadImages(req.files);

  const productExist = await Products.findOne({ title });

  if (productExist) {
    return res.status(401).json({ message: "Product already exist" });
  }

  const currentCategory = await Category.findOne({ mainCategory: category });

  if (!currentCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  if (!currentCategory.subCategory.includes(subCategory)) {
    return res.status(404).json({ message: "Sub category doesn't exist" });
  }

  const parsedVariants = JSON.parse(variants);

  const newProduct = await new Products({
    title,
    category: category,
    subCategory,
    description,
    variants: parsedVariants,
    images: imageUrls,
  });

  await newProduct.save();

  console.log("new product created", newProduct);

  res
    .status(200)
    .json({ message: "product added successfully", data: newProduct });
};

export const editProduct = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  const { title, category, subCategory, description, variants } = req.body;

  const updateData = {};

  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (variants) updateData.variants = JSON.parse(variants);

  if (category && subCategory) {
    const currentCategory = await Category.findOne({ mainCategory: category });
    if (!currentCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }
    if (!currentCategory.subCategory.includes(subCategory)) {
      return res
        .status(400)
        .json({ message: "Sub category doesn't exist in main category" });
    }

    updateData.category = category;
    updateData.subCategory = subCategory;
  }

  if (!req.files) {
    return res.status(400).json({ message: "Images are required" });
  }

  const imageUrls = await uploadImages(req.files);
  updateData.images = imageUrls;

  const updatedProduct = await Products.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Product updated successfully", data: updatedProduct });
};

export const getAllProducts = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    category = "",
    subCategory = "",
  } = req.query;

  const filter = {};

  if (search) filter.title = { $regex: search, $options: "i" };
  if (category) filter.category = category;
  if (subCategory) filter.subCategory = subCategory;

  const total = await Products.countDocuments(filter);

  const products = await Products.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.status(200).json({
    message: "Products fetched successfully",
    data: products,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const productById = async (req, res) => {
  const { productId } = req.params;

  console.log(productId)

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  const currentProduct = await Products.findById(productId);

  if (!currentProduct) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.status(200).json({ message: "Prodcut founded", data: currentProduct });
};
