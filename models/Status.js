const pool = require('./db');
const Base = require('./Base');
class Status extends Base {
    TABLE_NAME = 'status';
    SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

    convertRowToObject = (row) => {
        const object = new Status(row);
        return object;
    }
}
module.exports = new Status();
