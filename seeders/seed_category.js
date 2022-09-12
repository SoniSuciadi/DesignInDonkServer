require("../config/connection");
const dummyCategory = require("../data/category.json");
const Category = require("../models/category");

let seed = async () => {
  try {
    Category.insertMany(dummyCategory);
    console.log("success User added successfully!");
  } catch (err) {
    console.log(err);
  }
};
seed();
