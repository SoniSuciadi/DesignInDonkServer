const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Chat = mongoose.model("Chats", {
  sender: {
    type: ObjectId,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    require: true,
  },
});
module.exports = Chat;
