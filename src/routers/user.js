const express = require("express");
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();
router.post("/register-userCustomers",userControllers.registerUserCustomers);
router.post("/register-userSellers",userControllers.registerUserSellers);
router.post("/register-admin",userControllers.registerAdmin);
router.post("/login-user",userControllers.loginUser);
router.post("/update-accsessToken",userControllers.accsessToken);
router.post("/upgrade-UserSellers" , authMiddleware,userControllers.upgradeUserSellers);
router.delete("/delete-user" ,adminMiddleware, userControllers.deleteUser);
router.put("/update-user" ,authMiddleware, userControllers.updateUser);

module.exports = router;
