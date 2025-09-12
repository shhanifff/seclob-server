import Wishlist from "../model/wishlistModel.js";
import mongoose from "mongoose";

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  let wishlist = await Wishlist.findOne({ userId });

  if (wishlist) {
    const exists = wishlist.items.find(
      (item) => item.productId.toString() === productId
    );
    if (exists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    wishlist.items.push({ productId });
    await wishlist.save();
  } else {
    wishlist = new Wishlist({
      userId,
      items: [{ productId }],
    });
    await wishlist.save();
  }

  res.status(200).json({ message: "Product added to wishlist", wishlist });
};

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }

  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist not found" });
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await wishlist.save();

  res.status(200).json({ message: "Product removed from wishlist", wishlist });
};
