const Category = require("../models/CategoryModels");
const Outstanding = require("../models/OutstandingModels");
class MenuBlockController {
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

  // create outstanding
  async createOutstanding(req, res) {
    const { text, icon_url, link } = req.body;
    try {
      const data = await Outstanding.create({
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
  // get all menublock
  async getAllMenuBlock(req, res) {
    try {
      const menu_block = await Category.findAll();
      const highlight_block = await Outstanding.findAll();
      return res.status(200).json({
        menu_block: {
          title: "danh mục",
          items: menu_block,
        },
        highlight_block: {
          title: "danh mục",
          items: highlight_block,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new MenuBlockController();
