const express = require("express")
const router = express.Router()
const cartController = require("../controllers/CartController")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/add-to-cart", authMiddleware, cartController.addToCart )
router.get("/getAll-cart", authMiddleware, cartController.getAllcart )
router.post("/update-cart", authMiddleware, cartController.updateCart )
router.delete("/delete-cart/:id", authMiddleware, cartController.deleteCart )
module.exports= router