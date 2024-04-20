const express = require("express");
const provincesControllers = require("../controllers/provincesControllers")
const router = express.Router();

router.get("/districts/:id", provincesControllers.provincesDistricts);
router.get("/wards/:id", provincesControllers.provincesWards);
router.get("/", provincesControllers.provincesAll);
module.exports = router;
