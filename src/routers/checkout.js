const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const checkuotController = require("../controllers/CheckuotController")
router.post("/get", authMiddleware,checkuotController.checkuotOrder )
module.exports= router