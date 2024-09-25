const pool = require("./db");
const Base = require("./Base");
const orderItemModel = require("./OrderItem");
const statusModel = require("../models/Status");
const wardModel = require("../models/Ward");

class Order extends Base {
  TABLE_NAME = "order";
  SELECT_ALL_QUERY = `SELECT * FROM \`${this.TABLE_NAME}\``;

  convertRowToObject = (row) => {
    const object = new Order(row);
    return object;
  };

  // Tìm 1 dòng student
  getByCustomerId = async (customer_id) => {
    try {
      const [rows] = await pool.execute(
        `${this.SELECT_ALL_QUERY} WHERE ${this.TABLE_NAME}.customer_id=? ORDER BY id DESC`,
        [customer_id]
      );

      // check nếu không có dòng nào thỏa mãn trong bảng student
      if (rows.length === 0) {
        return [];
      }
      // gọi hàm tạo đối tượng
      const objects = this.convertArrayToObjects(rows);
      return objects;
    } catch (error) {
      throw new Error(error);
    }
  };

  getOrderItems = async () => {
    const orderItems = await orderItemModel.getByOrderId(this.id);
    return orderItems;
  };

  getStatus = async () => {
    const status = await statusModel.find(this.order_status_id);
    return status;
  };

  getShippingWard = async () => {
    const ward = await wardModel.find(this.shipping_ward_id);
    return ward;
  };

  getSubTotalPrice = async () => {
    const orderItems = await orderItemModel.getByOrderId(this.id);
    let totalPrice = 0;
    for (const orderItem of orderItems) {
      totalPrice += orderItem.unit_price * orderItem.qty;
    }

    return totalPrice;
  };
}
module.exports = new Order();
