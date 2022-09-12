const express = require("express");
const router = express.Router();
const Category = require("../controllers/category");

router.get("/", Category.getCategory);

module.exports = router;
