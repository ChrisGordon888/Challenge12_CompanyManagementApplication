const mysql = require('mysql2');

function createConnection() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'employee_tracker_db',
    port: 3306 
  });
  return connection;
}

module.exports = { createConnection };