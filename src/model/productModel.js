import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  variants: [
    {
      ram: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  subCategory: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const Products = mongoose.model("products", productSchema);
export default Products;
