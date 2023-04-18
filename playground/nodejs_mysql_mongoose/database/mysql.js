const mysql = require('mysql2');

const pool = mysql.createPool({
    host : '127.0.0.1',
    user : 'elice',
    password : '1234',
    database : 'team9'
});

module.exports = pool.promise();