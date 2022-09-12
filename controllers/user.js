require("../config/connection");
const mUser = require("../models/user");
const generateJWT = require("../helpers/generateJwt");
const comparePassword = require("../helpers/comparePassword");
const { ObjectId } = require("mongodb");
const hashPassword = require("../helpers/hashPassword");
const sendEmailConfirm = require("../services/sendEmailConfirm");
const verifyJwt = require("../helpers/verifyJwt");
const { OAuth2Client } = require("google-auth-library");

class User {
  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Invalid credential" };
      }
      let selectedUser = await mUser
        .findOne({
          email,
        })
        .exec();
      if (!selectedUser) {
        throw { name: "Invalid credential" };
      }
      if (!comparePassword(password, selectedUser.password)) {
        throw { name: "Invalid credential" };
      }
      res.status(200).json({
        statusCode: 200,
        msg: "Success Login",
        id: selectedUser.id,
        username: selectedUser.fullName,
        imgUrl: selectedUser.imgUrl,
        access_token: generateJWT(selectedUser),
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENTID);
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_token,
        requiredAudience: process.env.CLIENTSECRET,
      });
      const payload = ticket.getPayload();
      let { email, name: fullName } = payload;
      let selecteduser = await mUser.findOne({ email });
      if (!selecteduser) {
        let newUser = await mUser.create({
          fullName,
          email,
          password: "login with google",
          status: "Active",
        });
        res.status(200).json({
          statusCode: 200,
          msg: "Success Login",
          username: newUser.fullName,
          imgUrl: newUser.imgUrl,
          access_token: generateJWT(newUser),
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          msg: "Success Login",
          id: selecteduser.id,
          username: selecteduser.fullName,
          imgUrl: selecteduser.imgUrl,
          access_token: generateJWT(selecteduser),
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async registerUser(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      console.log(fullName, email, password);
      if (fullName == "" || email == "" || password == "") {
        throw { name: "Failed register" };
      }
      const newUser = new mUser({
        fullName,
        email,
        password,
        statusAccount: "Inactive",
      });
      await newUser.save();
      sendEmailConfirm(email, generateJWT(newUser));
      res.status(201).json({
        message: "Success register check you email",
      });
    } catch (error) {
      next(error);
    }
  }
  static async sendEmailForgotPassword(req, res, next) {
    try {
      let { email } = req.query;
      let selectedUser = await mUser
        .findOne({
          email,
        })
        .exec();
      if (selectedUser) {
        sendEmailConfirm(email, generateJWT(selectedUser), "forgot");
        res.status(200).json({
          message: "Link Reset Password Successfully send",
        });
      } else {
        throw { name: "Unauthorized" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async activationAccount(req, res, next) {
    try {
      let { token } = req.query;
      let payload = verifyJwt(token);
      let user = await mUser.findById(payload.id);
      if (!user) {
        throw { name: "Data not found" };
      }
      await mUser.updateOne(
        { _id: ObjectId(payload.id) },
        {
          statusAccount: "Active",
        }
      );
      res.status(200).json({
        message: `Congrastt your account is active now`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateUserData(req, res, next) {
    console.log(req.file);
    try {
      let { fullName, phoneNumber } = req.body;
      let { id } = req.user;
      let { imgUrl } = req.file;
      await mUser.updateOne(
        { _id: ObjectId(id) },
        {
          fullName,
          phoneNumber,
          imgUrl,
        }
      );
      res.status(200).json({
        message: `Data User With Id ${id} Success Updated`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async changePassword(req, res, next) {
    try {
      let { newPassword } = req.body;
      let { id } = req.user;
      await mUser.updateOne(
        { _id: ObjectId(id) },
        {
          password: hashPassword(newPassword),
        }
      );
      res.status(200).json({
        message: `Password User With Id ${id} Success Updated`,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = User;
