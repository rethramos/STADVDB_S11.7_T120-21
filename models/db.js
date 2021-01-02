require('dotenv').config();
const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
});

pool.on('connection', () => console.log('Pool connected'));
module.exports = pool;
