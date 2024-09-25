const productModel = require("./../models/Product");
const categoryModel = require("./../models/Category");

class HomeController {
  static index = async (req, res) => {
    const conds = [];
    let sorts = { featured: "DESC" }; // featued decreasing
    const page = 1;
    const itemPerPage = 4;

    const featuredProducts = await productModel.getBy(
      conds,
      sorts,
      page,
      itemPerPage
    );

    sorts = { created_date: "DESC" };
    const latestProducts = await productModel.getBy(
      conds,
      sorts,
      page,
      itemPerPage
    );

    const categoryProducts = [];
    const categories = await categoryModel.all();
    for (const category of categories) {
      const conds = {
        category_id: {
          type: "=",
          val: category.id,
        },
      };
      const products = await productModel.getBy(
        conds,
        sorts,
        page,
        itemPerPage
      );
      categoryProducts.push({
        categoryName: category.name,
        products,
      });
    }

    res.render("home/index", {
      featuredProducts,
      latestProducts,
      categoryProducts,
    });
  };
}

module.exports = HomeController;
