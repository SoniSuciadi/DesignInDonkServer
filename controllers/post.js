const mPost = require("../models/post");
const mUser = require("../models/user");
const { ObjectId } = require("mongodb");
class Post {
  static async getAllPost(req, res, next) {
    try {
      let { search, subCategory, category, skip } = req.query;
      let where = {};
      if (search) {
        where.title = { $regex: ".*" + search + ".*" };
      }
      if (subCategory) {
        where.subCategory = subCategory;
      }
      if (category) {
        where.category = category;
      }
      if (!skip) {
        skip = 0;
      }
      let posts = await mPost
        .find(where)
        .limit(8)
        .skip(skip * 8)
        .exec();
      res.status(200).json({
        statusCode: 200,
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCountPost(req, res, next) {
    try {
      let { search, subCategory, category } = req.query;
      let where = {};
      if (search) {
        where.title = { $regex: ".*" + search + ".*" };
      }
      if (subCategory) {
        where.subCategory = subCategory;
      }
      if (category) {
        where.category = category;
      }

      let count = await mPost.countDocuments(where).exec();
      res.status(200).json({
        countPost: count,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    try {
      let { title, description, category, subCategory } = req.body;
      let { imgUrl } = req.file;
      let newPost = await new mPost({
        title,
        description,
        imgUrl,
        category,
        subCategory,
        userCreate: req.user.id,
      }).save();
      await mUser.updateOne(
        { _id: ObjectId(req.user.id) },
        {
          $push: { post: newPost.id },
        }
      );
      res.status(201).json({
        statusCode: 201,
        message: `Post with id ${newPost.id} successfully add to user with id ${req.user.id}`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getPostById(req, res, next) {
    try {
      let { id } = req.params;
      let post = await mPost
        .findOne({
          _id: ObjectId(id),
        })
        .exec();
      let userCreate = await mUser.findById(ObjectId(post.userCreate), {
        fullName: 1,
        imgUrl: 1,
      });
      res.status(200).json({
        statusCode: 200,
        post: {
          _id: post.id,
          title: post.title,
          description: post.description,
          imgUrl: post.imgUrl,
          category: post.category,
          subCategory: post.subCategory,
          createdAt: post.createdAt,
          IduserCreate: userCreate.id,
          fullNameuserCreate: userCreate.fullName,
          ImguserCreate: userCreate.imgUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPostByUser(req, res, next) {
    try {
      let { id } = req.params;
      let selectedUser = await mUser
        .findOne({
          _id: ObjectId(id),
        })
        .exec();
      let postUser = await selectedUser.post.map((el) => {
        return mPost
          .findOne({
            _id: ObjectId(el),
          })
          .exec();
      });
      await Promise.allSettled(postUser).then((response) => {
        let hasil = response.map((el) => el.value);
        selectedUser.post = hasil;
      });

      res.status(200).json({
        statusCode: 200,
        selectedUser,
      });
    } catch (error) {
      next(error);
    }
  }
  static async editPost(req, res, next) {
    try {
      let { id } = req.params;
      let { title, desciption, imgUrl, category, subCategory } = req.body;
      await mPost.updateOne(
        { _id: ObjectId(id) },
        { title, desciption, imgUrl, category, subCategory }
      );
      res.status(200).json({
        statusCode: 200,
        message: `Post with id ${id} success fully edited`,
      });
    } catch (error) {}
  }
}
module.exports = Post;
