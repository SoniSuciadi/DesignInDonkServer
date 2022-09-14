const express = require("express");
const RoomChats = require("../controllers/roomChat");
const autentikasi = require("../middlewares/autentikasi");
const router = express.Router();

const uploadImage = require("../middlewares/uploadImage");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", autentikasi, RoomChats.getAllChat);
router.post(
  "/",
  autentikasi,
  upload.single("image"),
  uploadImage,
  RoomChats.sendMessage
);
router.get("/:id", autentikasi, RoomChats.getRoomChat);

module.exports = router;
