const express = require("express")
const router = express.Router()
const categoryControllers = require("../controllers/CategoryControllers")

router.post("/create-category", categoryControllers.createCategory)
router.get("/getAll-category", categoryControllers.getAllCategory)

module.exports= router