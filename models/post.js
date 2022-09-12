const mongoose = require("mongoose");

const mPost = mongoose.model("Posts", {
  title: {
    type: String,
    required: "Title is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  imgUrl: {
    type: String,
    required: "Image Url is required",
  },
  category: {
    type: String,
    required: "Category is required",
  },
  subCategory: {
    type: String,
    required: "Sub Category is required",
  },
  userCreate: {
    type: String,
    required: "userCreate is required",
  },
});

module.exports = mPost;
