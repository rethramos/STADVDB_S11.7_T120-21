const express = require('express');
const { getIndex } = require('../controllers/index-controller');
const pool = require('../models/db');
const router = express.Router();

router.get('/', getIndex);

// sample db call
// TODO modify later
router.get('/test', (req, res) => {
  const QUERY = `SELECT A12, A13 FROM district`;

  pool.query(QUERY, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});
module.exports = app => {
  app.use('/', router);
};
