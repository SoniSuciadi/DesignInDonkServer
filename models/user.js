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
    default:
      "https://firebasestorage.googleapis.com/v0/b/designindonk-6a56a.appspot.com/o/1663252160397--%C3%A2%C2%80%C2%94Pngtree%C3%A2%C2%80%C2%943drenderingmaleavatarbusinessman_7497905.png?alt=media&token=60983ee6-74cb-4680-a04a-d0b4d286690f",
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
