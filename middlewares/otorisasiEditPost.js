const { ObjectId } = require("mongodb");
const mPost = require("../models/post");

const otorisasiEditPost = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { id: userId } = req.user;
    let postSelect = await mPost.findById({ _id: ObjectId(id) }).exec();
    if (!(postSelect.userCreate == userId)) {
      throw { name: "Unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = otorisasiEditPost;
