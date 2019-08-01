const orm = require('../config/orm.js');

const burger = {
    /**
     * sends the table name and callback function to the orm connection to the database; all records are returned to the callback function
     * 
     * @param {function} callback 
     */
    all: function(callback) {
        orm.selectAll('burgers', (results) => {
            callback(results);
        });
    },
    /**
     * sends the table name and new record definition (key/value pairs) to the orm connection to the database; status returned to the callback function
     * 
     * @param {array} cols 
     * @param {array} vals
     * @param {function} callback 
     */
    create: function(cols, vals, callback) {
        orm.insertOne('burgers', cols, vals, (results) =>{
            callback(results);
        });
    },
    /**
     * sends the table name and columns to update for the record that matches id to the orm connection to the database; status returned to the callback function
     * 
     * @param {object} pairs 
     * @param {string} id 
     * @param {function} callback 
     */
    udpate: function(pairs, id, callback) {
        orm.updateOne('burgers', pairs, id, (results) =>{
            callback(results);
        });
    }
}

module.exports = burger;
