const pool = require("./db");
const Base = require("./Base");
class Transport extends Base {
  TABLE_NAME = "transport";
  SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

  convertRowToObject = (row) => {
    const object = new Transport(row);
    return object;
  };

  getByProvinceId = async (province_id) => {
    const transports = await this.fetch(`province_id=${province_id}`);
    if (transports.length > 0) {
      return transports[0];
    }
    return null;
  };
}
module.exports = new Transport();
