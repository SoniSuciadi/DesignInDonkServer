const express = require("express");
const RoomChats = require("../controllers/roomChat");
const autentikasi = require("../middlewares/autentikasi");
const router = express.Router();

router.get("/", autentikasi, RoomChats.getAllChat);
router.post("/", autentikasi, RoomChats.sendMessage);

module.exports = router;
