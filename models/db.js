const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'relational.fit.cvut.cz', // TODO place in .env
  user: 'guest',
  password: 'relational',
  database: 'financial',
  
})

pool.on('connection', () => console.log('Pool connected'));
module.exports = pool;