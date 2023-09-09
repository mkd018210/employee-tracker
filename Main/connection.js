const MYSQL2 = require('mysql2');
require('dotenv').config();

let mysql2;

if (process.env.JAWSDB_URL) {
  mysql2 = new MYSQL2(process.env.JAWSDB_URL);
} else {
  mysql2 = new MYSQL2(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = MYSQL2;