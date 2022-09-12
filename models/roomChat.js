const mongoose = require("mongoose");
const roomChatSchema = new mongoose.Schema({
  member: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
  },
});

const mRoomChat = mongoose.model("RoomChats", roomChatSchema);
module.exports = mRoomChat;
