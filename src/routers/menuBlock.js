const express = require("express")
const router = express.Router()
const menuBlockControllers = require("../controllers/MenuBlockControllers")

router.post("/create-category", menuBlockControllers.createCategory)
router.post("/create-outstanding", menuBlockControllers.createOutstanding)
router.get("/getAllMenuBlock", menuBlockControllers.getAllMenuBlock)

module.exports= router