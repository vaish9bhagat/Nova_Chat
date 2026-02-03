const express = require("express");
const { registerController, loginController, logOutHandler } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", logOutHandler)

module.exports = router;