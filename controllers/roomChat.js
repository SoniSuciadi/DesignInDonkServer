const mRoomChat = require("../models/roomChat");
const { ObjectId } = require("mongodb");
const Chat = require("../models/chat");
const mUser = require("../models/user");
const { response } = require("express");

class RoomChats {
  static async sendMessage(req, res, next) {
    try {
      console.log(req.file);
      const { id: userId } = req.user;
      const { id, pesan } = req.body;
      let imgUrl = "";
      if (req.file) {
        imgUrl = req.file.imgUrl;
      }
      if (!id) {
        throw { name: "bad request" };
      }
      let msg = new Chat({
        sender: userId,
        message: pesan,
        imgUrl: imgUrl,
        createdAt: new Date(),
      });

      let room = await mRoomChat.find({
        member: {
          $elemMatch: { _id: ObjectId(userId) },
        },
      });

      let getSelectRoom = room.find((el) => {
        let ketemu = el.member.find((element) => {
          return element._id.toString() === id;
        });
        if (ketemu) {
          return el;
        }
      });
      let roomId;
      if (getSelectRoom) {
        roomId = getSelectRoom._id;
        await mRoomChat.updateOne(
          {
            _id: getSelectRoom._id,
          },
          {
            $push: { messages: msg },
          }
        );
      } else {
        let temp = new mRoomChat({
          member: [{ _id: ObjectId(userId) }, { _id: ObjectId(id) }],
          messages: [msg],
        });

        let newRoom = await temp.save();
        roomId = newRoom._id;
      }
      room = await mRoomChat.findById({
        _id: roomId,
      });
      let tempUser = room.member.map((el) => {
        return mUser.findById({ _id: el._id }, { fullName: 1 }).exec();
      });
      let person;
      await Promise.allSettled(tempUser).then((response) => {
        let hasil = response.map((el) => {
          if (el.value._id !== userId) {
            person = el.value.fullName;
          }
          return el.value;
        });
        room.member = hasil;
      });
      room.messages.forEach((el) => {
        if (el.sender == userId) {
          el.sender = "anda";
        } else {
          el.sender = person;
        }
      });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  }
  static async getRoomChat(req, res, next) {
    try {
      const { id: userId } = req.user;
      let { id } = req.params;
      let room = await mRoomChat.find({
        member: {
          $elemMatch: { _id: ObjectId(id) },
        },
      });

      let getSelectRoom = room.find((el) => {
        let ketemu = el.member.find((element) => {
          return element._id.toString() === userId;
        });
        if (ketemu) {
          return el;
        }
      });
      if (!getSelectRoom) {
        throw { name: "Data not found" };
      }

      let tempUser = getSelectRoom.member.map((el) => {
        return mUser
          .findById({ _id: el._id }, { fullName: 1, imgUrl: 1 })
          .exec();
      });
      let person = "";
      await Promise.allSettled(tempUser).then((response) => {
        let hasil = response.map((el) => {
          if (el.value._id != userId) {
            getSelectRoom.member = el.value;
            person = el.value.fullName;
          }
          return el.value;
        });
        room.member = hasil;
      });
      getSelectRoom.messages.forEach((el) => {
        if (el.sender == userId) {
          el.sender = "anda";
        } else {
          el.sender = person;
        }
      });
      res.status(200).json(getSelectRoom);
    } catch (err) {
      next(err);
    }
  }
  static async getAllChat(req, res, next) {
    try {
      const { id: userId } = req.user;
      let allRoom = await mRoomChat.find(
        {
          member: {
            $elemMatch: { _id: ObjectId(userId) },
          },
        },
        { member: 1 }
      );
      let member = [];
      allRoom.forEach((el) => {
        member.push([
          mUser.findById(el.member[0]._id, { fullName: 1, imgUrl: 1 }).exec(),
          mUser.findById(el.member[1]._id, { fullName: 1, imgUrl: 1 }).exec(),
        ]);
      });
      let allMember = [];
      member.forEach((el) => {
        allMember.push(...el);
      });
      let memberResolve = [];
      await Promise.allSettled(allMember).then((res) => {
        memberResolve.push(...res);
      });
      allRoom.forEach((el, i) => {
        if (memberResolve[i * 2].value.id !== userId) {
          el.member = memberResolve[i * 2].value;
        } else {
          el.member = memberResolve[i * 2 + 1].value;
        }
      });

      res.status(200).json(allRoom);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = RoomChats;
