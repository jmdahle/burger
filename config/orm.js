const connection = require('./connection.js');
 

const orm = {
    /**
     * selectAll method selects all columns and all records from the table passed as an argument.  The data is used as an argument in the call back function passed to selectAll as an argument
     * 
     * @param {string} table 
     * @param {function} callback 
     */
    selectAll: function(table, callback) {
        let sql = `SELECT * from ${table};`;
        console.log(sql);
        connection.query(sql, (error, data) => {
            if (error) throw error;
            callback(data);
        });
    },
    /**
     * insertOne method inserts ONE new record into the table, creating an insert statement based on the column and value pairs provided as arguments.
     * 
     * @param {string} table 
     * @param {obejct} pairs 
     * @param {function} callback 
     */
    insertOne: function(table, pairs, callback) {
        let sql1 = `INSERT into ${table} (`;
        let sql2 = ' VALUES (';
        for (let key in pairs) {
            sql1 += `${key}, `;
            let value = pairs[key];
            value = this.quoteString(value);
            sql2 += `${value}, `;
        }
        // remove the final comma and space, add a terminating parenthesis
        sql1 = sql1.substring(0,sql1.length - 2) + ')';
        sql2 = sql2.substring(0,sql2.length - 2) + ')';
        let sql = sql1 + sql2 + ';';
        console.log(sql);
        connection.query(sql, (error, data) => {
            if (error) throw error;
            callback(data);
        });
    },
    /**
     * updateOne method updates ONE record (with id = {id}), creating an update statement based on the columns and value paris provided as arguments.
     * 
     * @param {string} table 
     * @param {pbject} pairs 
     * @param {string} id 
     * @param {function} callback 
     */
    updateOne: function(table, pairs, id, callback) {
        let sql = `UPDATE ${table} SET `;
        for (let key in pairs) {
            let value = pairs[key];
            value = this.quoteString(value);
            sql += `${key} = ${value}, `;
        }
        // remove the final comma and space
        id = this.quoteString(id);
        sql = sql.substring(0,sql.length - 2);
        sql += ` WHERE id = ${id}`;
        console.log(sql);
        connection.query(sql, (error, data) => {
            if (error) throw error;
            callback(data);
        })
    },
    /**
     * Puts quotations around value if it is a string with spaces
     * 
     * @param {string} value 
     */
    quoteString: function(value) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
        }
        return value;
    }
}

module.exports = orm;