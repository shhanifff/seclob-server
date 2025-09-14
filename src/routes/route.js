import express from "express";
import { Login, Register } from "../controllers/userController.js";
import {
  addProduct,
  editProduct,
  getAllProducts,
  productById,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import {
  addMainCate,
  addSubCate,
  getCategory,
} from "../controllers/cateController.js";
import {
  addToCart,
  cartById,
  removeFromCart,
} from "../controllers/CartController.js";
import {
  addToWishlist,
  removeFromWishlist,
  wishlistById,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

router.post("/addCategory", addMainCate);
router.post("/addSubCategory", addSubCate);
router.get("/getCategory", getCategory);

router.get("/products", getAllProducts);
router.get("/products/:productId", productById);
router.post("/addProduct", upload.array("images", 5), addProduct);
router.patch("/editProduct/:productId", upload.array("images", 5), editProduct);

router.patch("/addToCart", addToCart);
router.patch("/removeFromCart", removeFromCart);
router.get("/cartById/:userId", cartById);

router.patch("/addToWishlist", addToWishlist);
router.patch("/removeFromWishlist", removeFromWishlist);
router.get("/wishlistByid/:userId", wishlistById);

export default router;
