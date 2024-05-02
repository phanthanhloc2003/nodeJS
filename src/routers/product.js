const express = require("express")
const router = express.Router()
const productControllers = require("../controllers/ProductController")
const authMiddleware = require("../middleware/authMiddleware")
router.post("/create-product",authMiddleware , productControllers.createProduct)
router.get("/getAll-product",authMiddleware , productControllers.getAllProduct)
router.get("/getDetails-product/:id",authMiddleware , productControllers.getDetailsProduct)
module.exports= router