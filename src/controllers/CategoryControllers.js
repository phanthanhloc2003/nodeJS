const Category = require("../models/CategoryModels");
class CategoryController {
  //create category controller
  async createCategory(req, res) {
    const { text, icon_url, link } = req.body;
    try {
      const data = await Category.create({
        ...req.body,
      });
      return res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }

  // getAll category
  async getAllCategory(req, res) {
    try {
      const data = await Category.findAll();
      if (data <= 0) {
        return res.status(500).json({
          status: "error",
          message: " no category found",
        });
      }

      return res.status(200).json({
    status: "success",
    data : data,
      })
    } catch (error) {
        return res.status(500).json({
            status:"error",
            message: error.message
        })
    }
  }
}

module.exports = new CategoryController();
