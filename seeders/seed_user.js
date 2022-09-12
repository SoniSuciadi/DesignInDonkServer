const bcrypt = require("bcrypt");
const User = require("../models/user");
require("../config/connection");

const dummyUser = require("../data/user.json");

dummyUser.forEach((el) => {
  el.password = bcrypt.hashSync(el.password, 10);
});
let seed = async () => {
  try {
    User.insertMany(dummyUser);
    console.log("success User added successfully!");
  } catch (err) {
    console.log(err);
  }
};
seed();
