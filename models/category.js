const mongoose = require("mongoose");

const mCategory = mongoose.model("Categories", {
  title: {
    type: String,
    required: true,
  },
  subCategory: {
    type: Array,
    default: [],
  },
});

module.exports = mCategory;
