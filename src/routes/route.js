import express from "express"
import { Login, Register } from "../controllers/userController.js"
import { addProduct, editProduct, getAllProducts } from "../controllers/productController.js"
import upload from "../middlewares/multer.js"
import { addMainCate, addSubCate } from "../controllers/cateController.js"
import { addToCart, removeFromCart } from "../controllers/CartController.js"
import { addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js"

const router=express.Router()

router.post('/login',Login)
router.post('/register',Register)

router.post("/addCategory",addMainCate)
router.post("/addSubCategory",addSubCate)

router.get("/products",getAllProducts)
router.post("/addProduct",upload.array('images',5) ,addProduct)
router.patch("/editProduct/:productId",upload.array('images',5),editProduct)

router.patch("/addToCart",addToCart)
router.patch("/removeFromCart",removeFromCart)

router.patch("/addToWishlist",addToWishlist)
router.patch("/removeFromWishlist",removeFromWishlist)


export default router