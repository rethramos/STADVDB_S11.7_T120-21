const pool = require('../models/db');

const SQL_COMMENT = '-- ';

// DISTRICTS CONTROLLERS -----------------------------------------

exports.getUnemploymentRate = (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, SUM(A12 + A13) / 2 as 'Average Unemployment Rate'
  FROM district
  ${region ? '' : SQL_COMMENT}WHERE A3 IN (?)
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
  ${region ? '' : SQL_COMMENT}WHERE A3 IN (?)
  GROUP BY Region
  `;

  pool.query(QUERY, [region], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.getCommittedCrimes = (req, res) => {
  let district = req.query.district
    ? req.query.district.split(',').map(d => d.trim())
    : '';

  const QUERY = `
  SELECT A2 as "District", SUM(A15 + A16)  / 2 as "Average Crime"
  FROM district
  ${district ? '' : SQL_COMMENT}WHERE A2 = ?
  GROUP BY A2
  `;

  pool.query(QUERY, [district], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

// ACCOUNTS CONTROLLERS -----------------------------------------

exports.getFinishedContracts = (req, res) => {
  let account_id = req.query.account_id;

  const QUERY = `
  SELECT a.account_id, COUNT(l.status) AS "Finished Contracts"
  FROM financial.loan as l, financial.account as a
  WHERE l.account_id = a.account_id AND l.status = 'A'
  GROUP BY a.account_id
  ${account_id ? '' : SQL_COMMENT}HAVING a.account_id = ?
  `;

  pool.query(QUERY, [account_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

exports.getAccountDistrict = (req, res) => {
  let account_id = req.query.account_id;

  const QUERY = `
  SELECT a.account_id, A2 as "District name"
  FROM district as d
  INNER JOIN account as a
  ON d.district_id = a.district_id
  ${account_id ? '' : SQL_COMMENT}WHERE account_id = ?
  `;

  pool.query(QUERY, [account_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

// LOANS CONTROLLERS -----------------------------------------

exports.getLoanCount = (req, res) => {
  let status = req.query.status;

  const QUERY = `
  SELECT A3 as "Region Name", COUNT(l.loan_id) AS "Loan Count"
  FROM financial.loan as l, financial.account as a, financial.district as d
  WHERE l.account_id = a.account_id AND d.district_id = a.district_id
  ${status ? '' : SQL_COMMENT}AND l.status = ?
  GROUP BY A3
  `;

  pool.query(QUERY, [status], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
};

// LOANS CONTROLLERS -----------------------------------------

exports.getRegionTransactions = (req, res) => {
  let k_symbol = req.query.k_symbol;

  const QUERY = `
  SELECT A3 AS "Region Name", COUNT(t.trans_id) AS "Transaction Count", SUM(amount) AS "Total Amount"
  FROM financial.trans as t, financial.account as a, financial.district as d
  WHERE t.account_id = a.account_id AND a.district_id = d.district_id
  ${k_symbol ? '' : SQL_COMMENT}AND t.k_symbol = ?
  GROUP BY A3
  ORDER BY COUNT(t.trans_id)
  `;

  pool.query(QUERY, [k_symbol], (err, results, fields) => {
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
