const express = require("express");
const router = express.Router();
const User = require("../controllers/user");
const autentikasi = require("../middlewares/autentikasi");
const uploadImage = require("../middlewares/uploadImage");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/login", User.loginUser);
router.post("/login-google", User.loginGoogle);
router.post("/register", User.registerUser);
router.get("/confirm", User.activationAccount);
router.get("/forgot", User.sendEmailForgotPassword);
router.patch("/", autentikasi, User.changePassword);
router.put(
  "/",
  autentikasi,
  upload.single("image"),
  uploadImage,
  User.updateUserData
);

module.exports = router;
