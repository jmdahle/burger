require('dotenv').config(); // guard private login data
const mysql = require('mysql');

if (process.env.JAWSDB_URL) {
    const connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.DBHOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
}
module.exports = connection;

