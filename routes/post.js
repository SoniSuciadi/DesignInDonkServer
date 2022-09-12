const express = require("express");
const router = express.Router();
const Post = require("../controllers/post");
const otorisasiEditPost = require("../middlewares/otorisasiEditPost");
const autentikasi = require("../middlewares/autentikasi");

const uploadImage = require("../middlewares/uploadImage");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", Post.getAllPost);
router.post(
  "/",
  autentikasi,
  upload.single("image"),
  uploadImage,
  Post.addPost
);
router.get("/count", Post.getCountPost);
router.get("/:id", Post.getPostById);
router.put("/:id", otorisasiEditPost, Post.editPost);
router.get("/user/:id", Post.getPostByUser);

module.exports = router;
