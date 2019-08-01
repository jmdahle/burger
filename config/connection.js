require('dotenv').config(); // guard private login data
const mysql = require('mysql');

const connection = () => {
    if (process.env.JAWSDB_URL) {
        mysql.createConnection(process.env.JAWSDB_URL);
    } else {
        mysql.createConnection({
            host: process.env.HOST,
            port: process.env.DBHOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }
}

module.exports = connection;

