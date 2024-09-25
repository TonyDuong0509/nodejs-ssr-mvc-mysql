const pool = require("./db");
const Base = require("./Base");
class Brand extends Base {
  TABLE_NAME = "brand";
  SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

  convertRowToObject = (row) => {
    const object = new Brand(row);
    return object;
  };
}
module.exports = new Brand();
