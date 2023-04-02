const mysql = require('mysql2');
const config = {
    host: '207.148.76.241',
    user: 'root',
    password: 'gwapo',
    database: 'blssystem',
}

const connection = mysql.createConnection(config);

module.exports = connection;
