const express = require("express");
const autentikasi = require("../middlewares/autentikasi");
const router = express.Router();
const User = require("../controllers/user");

const routesUser = require("./user");
const routesCategories = require("./category");
const routespost = require("./post");
const routesRoomChat = require("./roomChat");
const Post = require("../controllers/post");

router.use("/user", routesUser);
router.use("/categories", routesCategories);
router.use("/posts", routespost);
router.use("/chats", routesRoomChat);

module.exports = router;
