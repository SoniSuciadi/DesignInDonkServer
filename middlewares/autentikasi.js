const { ObjectId } = require("mongodb");
const verifyJwt = require("../helpers/verifyJwt");
const mUser = require("../models/user");

let autentikasi = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    let payload = verifyJwt(access_token);
    let selectedUser = await mUser
      .findOne({
        _id: ObjectId(payload.id),
      })
      .exec();
    if (!selectedUser) {
      throw { name: "Token Invalid" };
    }
    req.user = {
      id: selectedUser.id,
      fullName: selectedUser.fullName,
      email: selectedUser.email,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = autentikasi;
