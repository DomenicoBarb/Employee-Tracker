const mysql = require('mysql2');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nico585',
    database: 'employee_tracker_db'
});

module.exports = database;