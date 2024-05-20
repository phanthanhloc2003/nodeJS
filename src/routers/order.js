const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const orderControllers = require("../controllers/OrderControllers")
router.get("/get-order", authMiddleware,orderControllers.getOrder)
router.put("/update-quantity", authMiddleware,orderControllers.updateQuantity)
router.post("/purchase-history", authMiddleware,orderControllers.handlePurchaseHistory)
router.get("/get-purchaseHistory", authMiddleware,orderControllers.getPurchaseHistory)
router.post("/", authMiddleware,orderControllers.handleOrder)


module.exports= router