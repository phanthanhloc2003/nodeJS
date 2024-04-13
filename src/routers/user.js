const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();


router.get("/login",userControllers.login);
module.exports = router;
