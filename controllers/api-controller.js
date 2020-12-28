const pool = require('../models/db');

exports.getUnemploymentRate = (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, SUM(A12 + A13) / 2 as 'Average Unemployment Rate'
  FROM district
  WHERE A3 IN (?)
  GROUP BY Region
  `;

  pool.query(QUERY, [region], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.getSalary = (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, AVG (A11) as 'Average Salary'
  FROM district
  WHERE A3 IN (?)
  GROUP BY Region
  `;

  pool.query(QUERY, [region], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};
