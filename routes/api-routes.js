const express = require('express');
const pool = require('../models/db');
const router = express.Router();

router.get('/unemployment-rate', (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, AVG(A12 + A13) as 'Average Unemployment Rate'
  FROM district
  WHERE A3 IN (?)
  GROUP BY Region
  `;

  pool.query(QUERY, [region], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = app => {
  app.use('/api', router);
};
