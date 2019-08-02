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
        // console.log(sql);
        connection.query(sql, (error, data) => {
            if (error) throw error;
            callback(data);
        });
    },
    /**
     * insertOne method inserts ONE new record into the table, creating an insert statement based on the column and value pairs provided as arguments.
     * 
     * @param {string} table 
     * @param {array} cols
     * @param {array} vals 
     * @param {function} callback 
     */
    insertOne: function(table, cols, vals, callback) {
        let sql = `INSERT INTO ${table}`;
        sql += " (";
        sql += cols.toString();
        sql += ") ";
        sql += "VALUES (";
        sql += this.fillQuestionMarks(vals.length);
        sql += ") ";
        // console.log(sql);
        connection.query(sql, vals, (error, data) => {
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
        let sql = `UPDATE ${table}`;
        sql += ' SET ';
        sql += this.objectToSQL(pairs);
        sql += ` WHERE id = ${id}`;
        // console.log(sql);
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
            value = "`" + value + "`";
        }
        return value;
    },
    fillQuestionMarks: function(num) {
        let array = [];
        for (let i = 0; i < num; i++) {
          array.push("?");
        }
        return array.toString();
    },
    objectToSQL: function (obj) {
        var array = [];
        for (var key in obj) {
            var value = obj[key];
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
              value = "'" + value + "'";
            }
            array.push(key + "=" + value);
        }
        return array.toString();
    }
}

module.exports = orm;