const pool = require("./db");
const Base = require("./Base");
class Category extends Base {
  TABLE_NAME = "category";
  SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

  convertRowToObject = (row) => {
    const object = new Category(row);
    return object;
  };

  // later
  getProducts = () => {};
}
module.exports = new Category();
