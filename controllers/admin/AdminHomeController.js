const Category = require("./../../models/Category");

class AdminHomeController {
  static index = async (req, res) => {
    const categories = await Category.all();

    res.render("admin/home/index", {
      layout: "admin/layout",
      categories,
    });
  };

  static createCategoryPage = async (req, res) => {
    res.render("admin/home/createCategory", {
      layout: "admin/layout",
    });
  };

  static createCategory = async (req, res) => {
    const { name } = req.body;
    const category = await Category.save();
  };
}

module.exports = AdminHomeController;
