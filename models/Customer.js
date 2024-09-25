const pool = require('./db');
const Base = require('./Base');
class Customer extends Base {
    TABLE_NAME = 'customer';
    SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

    convertRowToObject = (row) => {
        const object = new Customer(row);
        return object;
    }

    // Tìm 1 dòng student 
    findEmail = async (email) => {
        try {
            const [rows] = await pool.execute(`${this.SELECT_ALL_QUERY} WHERE ${this.TABLE_NAME}.email=?`, [email]);
            // check nếu không có dòng nào thỏa mãn trong bảng student
            if (rows.length === 0) {
                return null;
            }
            const row = rows[0];
            // gọi hàm tạo đối tượng
            const object = this.convertRowToObject(row);
            return object;
        }
        catch (error) {
            throw new Error(error);
        }

    }
}
module.exports = new Customer();
