require("../config/connection");
const dummyPost = require("../data/posting.json");
const mPost = require("../models/post");
const mUser = require("../models/user");
const { ObjectId } = require("mongodb");

let seed = async () => {
  try {
    dummyPost.forEach(
      async ({
        title,
        description,
        imgUrl,
        category,
        subCategory,
        userCreate,
      }) => {
        let newPost = await new mPost({
          title,
          description,
          imgUrl,
          category,
          subCategory,
          userCreate,
        }).save();
        console.log(newPost);
        await mUser.updateOne(
          { _id: new ObjectId(userCreate) },
          {
            $push: { post: newPost.id },
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
  }
};
seed();
