const express = require("express")
const router = express.Router()
const productControllers = require("../controllers/ProductController")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/create-product",authMiddleware , productControllers.createProduct)
module.exports= router