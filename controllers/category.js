const mCategory = require("../models/category");

class Category {
  static async getCategory(req, res, next) {
    try {
      let { title } = req.query;
      let categories = await mCategory.find({ title }).exec();
      res.status(200).json({
        statusCode: 200,
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Category;
