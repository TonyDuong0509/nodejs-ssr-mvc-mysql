const pool = require('./db');
const Base = require('./Base');
class Action extends Base {
    TABLE_NAME = 'action';
    SELECT_ALL_QUERY = `SELECT * FROM ${this.TABLE_NAME}`;

    convertRowToObject = (row) => {
        const object = new Action(row);
        return object;
    }

}
module.exports = new Action();
