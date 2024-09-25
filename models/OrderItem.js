const pool = require('./db');
const Base = require('./Base');
const productModel = require('./Product')
class OrderItem extends Base {

    TABLE_NAME = 'order_item';
    SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;


    convertRowToObject = (row) => {
        const object = new OrderItem(row);
        return object;
    }


    getByOrderId = async (order_id) => {
        try {
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} WHERE ${this.TABLE_NAME}.order_id=?`, [order_id]);
            // check nếu không có dòng nào thỏa mãn trong bảng student
            return this.convertArrayToObjects(rows);
        }
        catch (error) {
            throw new Error(error);
        }
    }

    getProduct = async () => {
        const product = await productModel.find(this.product_id);
        return product;
    }

}
module.exports = new OrderItem();
