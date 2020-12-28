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

exports.getCommittedCrimes = (req, res) => {
  const SQL_COMMENT = '-- ';
  let district = req.query.district
    ? req.query.district.split(',').map(d => d.trim())
    : '';

  const QUERY = `
  SELECT A2 as "District", SUM(A15 + A16)  / 2 as "Average Crime"
  FROM district
  ${req.query.district ? '' : SQL_COMMENT}WHERE A2 = ?
  GROUP BY A2
  `;

  pool.query(QUERY, [district], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

// HELPER CONTROLLERS -----------------------------------------

exports.getDistrictNames = (req, res) => {
  const QUERY = `
  SELECT A2
  FROM district
  ORDER BY A2
  `;

  pool.query(QUERY, [], (err, results, fields) => {
    if (err) throw err;
    res.send(results.map(result => result.A2));
  });
};
