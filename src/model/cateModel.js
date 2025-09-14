import mongoose from "mongoose";

const cateSchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
    default: [],
  },
});

const Category = mongoose.model("categories", cateSchema);

export default Category;
