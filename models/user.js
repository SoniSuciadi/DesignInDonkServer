const mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const hashPassword = require("../helpers/hashPassword");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "Fullname is required",
  },
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: "Password is required",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    default: "",
  },
  favorite: {
    type: Array,
    default: [],
  },
  post: {
    type: Array,
    default: [],
  },
  statusAccount: {
    type: String,
    default: "NotActive",
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = hashPassword(this.password);
  next();
});

const mUser = mongoose.model("Users", userSchema);

module.exports = mUser;
