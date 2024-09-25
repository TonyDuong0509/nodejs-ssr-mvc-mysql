const pool = require("./db");
const Base = require("./Base");
const imageItemModel = require("./ImageItem");
const brandModel = require("./Brand");
const commentModel = require("./Comment");
class Product extends Base {
  TABLE_NAME = "view_product";
  SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

  convertRowToObject = (row) => {
    if (row.sale_price) {
      row.sale_price = Number(row.sale_price); //chuyển chuỗi thành số
    }
    const object = new Product(row);
    return object;
  };

  // array_conds: lấy sản phẩm dựa theo cột
  // array_sorts: sắp xếp tăng hay giảm
  // page: trang thứ mấy
  // qty_per_page: số lượng sản phẩm mỗi trang
  getBy = async (
    array_conds = {},
    array_sorts = {},
    page = null,
    qty_per_page = null
  ) => {
    let page_index;
    if (page) {
      page_index = page - 1;
    }
    let temp = [];
    for (let column in array_conds) {
      let cond = array_conds[column];
      let type = cond.type;
      let val = cond.val;
      let str = `${column} ${type} `;
      if (["BETWEEN", "LIKE"].includes(type)) {
        str += val; //name LIKE '%abc%'
      } else {
        str += `'${val}'`;
      }
      temp.push(str);
    }
    let condition = null;
    if (Object.keys(array_conds).length) {
      condition = temp.join(" AND ");
    }
    temp = [];
    for (let key in array_sorts) {
      let sort = array_sorts[key];
      temp.push(`${key} ${sort}`);
    }
    let sort = null;
    if (Object.keys(array_sorts).length) {
      sort = `ORDER BY ${temp.join(" , ")}`;
    }
    let limit = null;
    if (qty_per_page) {
      let start = page_index * qty_per_page;
      limit = `LIMIT ${start}, ${qty_per_page}`;
    }

    return await this.fetch(condition, sort, limit);
  };

  getImageItems = async () => {
    return imageItemModel.getByProductId(this.id);
  };

  getBrand = async () => {
    return brandModel.find(this.brand_id);
  };

  getComments = async () => {
    return commentModel.getByProductId(this.id);
  };
}
module.exports = new Product();
