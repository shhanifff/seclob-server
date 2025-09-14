import mongoose from "mongoose";
import Cart from "../model/cartModel.js";
import Users from "../model/userModel.js";

export const addToCart = async (req, res) => {
  const { productId, userId, qty } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid productId" });
  }

  const userValidation = await Users.findById(userId);
  if (!userValidation) {
    return res.status(404).json({ message: "User Not Found" });
  }

  let cart = await Cart.findOne({ userId });

  if (cart) {
    // Check if product already exists in cart
    const existingProduct = cart.items.find(
      (p) => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    await cart.save();
  } else {
    cart = new Cart({
      userId,
      items: [{ productId, qty }],
    });
    await cart.save();
  }

  res.status(200).json({ message: "Product added to cart", cart });
};

export const removeFromCart = async (req, res) => {
  const { productId, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  res.status(200).json({ message: "Product removed from cart", cart });
};

export const cartById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const userCart = await Cart.findOne({ userId }).populate("items.productId");
  if (!userCart) {
    return res.status(404).json({ message: "Cart Not Found" });
  }

  res.status(200).json({ message: "Cart founded", data: userCart });
};
