const productModel = require("./../models/Product");
const categoryModel = require("../models/Category");

class ProductController {
  static index = async (req, res) => {
    let conds = {};
    let sorts = {};
    const page = req.query.page || 1;
    const itemPerPage = 10;

    // Find with category
    const cid = req.params.category_id ?? null;
    if (cid) {
      conds = {
        category_id: {
          type: "=",
          val: cid,
        },
      };
    }

    // Find with price range
    const priceRange = req.query["price-range"] || null;
    if (priceRange) {
      const temp = priceRange.split("-");
      const startPrice = temp[0]; //100000
      const endPrice = temp[1]; //200000
      conds = {
        ...conds,
        sale_price: {
          type: "BETWEEN",
          val: `${startPrice} AND ${endPrice}`,
        },
      };
      // ?price-range=1000000-greater
      if (endPrice === "greater") {
        conds = {
          ...conds,
          sale_price: {
            type: ">=",
            val: startPrice,
          },
        };
      }
    }

    // Find with name
    const search = req.query.search ?? null;
    if (search) {
      conds = {
        name: {
          type: "LIKE",
          val: `'%${search}%'`,
        },
      };
    }

    // Find with sort
    const sort = req.query.sort ?? null;
    if (sort) {
      const temp = sort.split("-");
      const dummyCol = temp[0];
      const order = temp[1].toUpperCase();
      const map = {
        price: "sale_price",
        alpha: "name",
        created: "created_date",
      };
      const colName = map[dummyCol];
      sorts = { [colName]: order };
    }

    const products = await productModel.getBy(conds, sorts, page, itemPerPage);

    const totalProducts = await productModel.getBy(conds, sorts);
    const totalPage = Math.ceil(totalProducts.length / itemPerPage);

    const categories = await categoryModel.all();
    res.render("product/index", {
      products,
      categories,
      cid,
      priceRange,
      sort,
      search,
      totalPage,
      page,
    });
  };

  static details = async (req, res) => {
    const slug = req.params.slug;
    const temp = slug.split("-");
    const id = temp[temp.length - 1];
    const product = await productModel.find(id);
    const imageItems = await product.getImageItems();
    const brand = await product.getBrand();
    const cid = await product.category_id;
    const categories = await categoryModel.all();
    const comments = await product.getComments();

    const conds = {
      category_id: {
        type: "=",
        val: product.category_id,
      },
      id: {
        type: "!=",
        val: product.id,
      },
    };
    const relatedProducts = await productModel.getBy(conds);

    res.render("product/details", {
      product,
      imageItems,
      brand,
      cid,
      categories,
      comments,
      relatedProducts,
    });
  };
}

module.exports = ProductController;
