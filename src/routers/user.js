const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();
router.post("/register-userCustomers",userControllers.registerUserCustomers);
router.post("/register-userSellers",userControllers.registerUserSellers);
router.post("/login-user",userControllers.loginUser);
module.exports = router;
