import mongoose from "mongoose";

const cateSchema = new mongoose.Schema({
  mainCategory: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      type: String,
      require: true,
      unique: true,
    },
  ],
});

const Category=mongoose.model('categories',cateSchema)
export default Category