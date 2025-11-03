const express = require("express");
const { chatController, getMessages, getChats, deleteChat } = require("../controllers/chat.controller");
const authmiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/chat", authmiddleware, chatController)
router.get("/getchats", authmiddleware, getChats);
router.get("/messages/:chatId", authmiddleware, getMessages);
router.delete("/deletechat/:chatId", authmiddleware, deleteChat)

module.exports = router;