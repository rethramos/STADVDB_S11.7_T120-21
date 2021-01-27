const timer = require('../helpers/timer-helper');
const pool = require('../models/db');

const SQL_COMMENT = '-- ';

// DISTRICTS CONTROLLERS -----------------------------------------

exports.getUnemploymentRate = (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, SUM(A12 + A13) / 2 as 'Average Unemployment Rate'
  FROM financial.district
  ${region ? '' : SQL_COMMENT}WHERE A3 IN (?)
  GROUP BY Region
  `;

  timer.start();
  pool.query(QUERY, [region], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

exports.getSalary = (req, res) => {
  let region = req.query.region
    ? req.query.region.split(',').map(r => r.trim())
    : '';

  const QUERY = `
  SELECT A3 as Region, AVG (A11) as 'Average Salary'
  FROM financial.district
  ${region ? '' : SQL_COMMENT}WHERE A3 IN (?)
  GROUP BY Region
  `;

  timer.start();
  pool.query(QUERY, [region], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

exports.getCommittedCrimes = (req, res) => {
  let district = req.query.district
    ? req.query.district.map(d => d.trim())
    : null;

  const QUERY = `
  SELECT A2 as "District", SUM(A15 + A16)  / 2 as "Average Crime"
  FROM financial.district
  ${district ? '' : SQL_COMMENT}WHERE A2 IN (?)
  GROUP BY A2
  `;

  timer.start();
  pool.query(QUERY, [district], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

// ACCOUNTS CONTROLLERS -----------------------------------------

exports.getContractStatus = (req, res) => {
  let { account_id, status, optimized } = req.query;

  const QUERY =
    optimized == 'true'
      ? `
  SELECT a.account_id, a.frequency, COUNT(l.status) AS "Contract Count"
  FROM financial.loan as l
  INNER JOIN financial.account as a
  ON l.account_id = a.account_id
  ${account_id ? '' : SQL_COMMENT}WHERE l.status =  ?
  ${account_id ? '' : SQL_COMMENT}AND a.account_id = ?
  GROUP BY a.account_id, a.frequency
  `
      : `
  SELECT a.account_id, a.frequency, COUNT(l.status) AS "Contract Count"
  FROM financial.loan as l, financial.account as a
  WHERE l.account_id = a.account_id
  ${status ? '' : SQL_COMMENT}AND l.status = ?
  GROUP BY a.account_id, a.frequency
  ${account_id ? '' : SQL_COMMENT}HAVING a.account_id = ?
  `;

  timer.start();
  pool.query(QUERY, [status, account_id], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

exports.getAccountDistrict = (req, res) => {
  let { account_id, optimized } = req.query;

  const QUERY =
    optimized == 'true'
      ? `
  SELECT a.account_id, A2 as "District name"
  FROM (
    SELECT account_id, district_id 
    FROM financial.account 
    ${account_id ? '' : SQL_COMMENT}WHERE account_id = ?
  ) as a
  INNER JOIN financial.district as d
  ON d.district_id = a.district_id
  `
      : `
  SELECT a.account_id, A2 as "District name"
  FROM financial.district as d
  INNER JOIN financial.account as a
  ON d.district_id = a.district_id
  ${account_id ? '' : SQL_COMMENT}WHERE account_id = ?
  `;

  timer.start();
  pool.query(QUERY, [account_id], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

// LOANS CONTROLLERS -----------------------------------------

exports.getLoanCount = (req, res) => {
  let { status, optimized } = req.query;

  const QUERY =
    optimized == 'true'
      ? `
  SELECT A3 as "Region Name", COUNT(l.loan_id) AS "Loan Count"
  FROM (
    SELECT *
    FROM financial.loan
    ${status ? '' : SQL_COMMENT}WHERE status = ?
  ) as l, financial.account as a, financial.district as d
  WHERE l.account_id = a.account_id AND d.district_id = a.district_id
  GROUP BY A3
  `
      : `
  SELECT A3 as "Region Name", COUNT(l.loan_id) AS "Loan Count"
  FROM financial.loan as l, financial.account as a, financial.district as d
  WHERE l.account_id = a.account_id AND d.district_id = a.district_id
  ${status ? '' : SQL_COMMENT}AND l.status = ?
  GROUP BY A3
  `;

  timer.start();
  pool.query(QUERY, [status], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

// TRANSACTIONS CONTROLLERS -----------------------------------------

exports.getRegionTransactions = (req, res) => {
  let { k_symbol, optimized } = req.query;

  const QUERY =
    optimized == 'true'
      ? `
  SELECT A3 AS "Region Name", COUNT(t.trans_id) AS "Transaction Count", SUM(amount) AS "Total Amount"
  FROM (
    SELECT *
    FROM financial.trans
    ${k_symbol ? '' : SQL_COMMENT}WHERE k_symbol = ?
  ) as t, financial.account as a, financial.district as d
  WHERE t.account_id = a.account_id AND a.district_id = d.district_id
  GROUP BY A3
  ORDER BY COUNT(t.trans_id)
  `
      : `
  SELECT A3 AS "Region Name", COUNT(t.trans_id) AS "Transaction Count", SUM(amount) AS "Total Amount"
  FROM financial.trans as t, financial.account as a, financial.district as d
  WHERE t.account_id = a.account_id AND a.district_id = d.district_id
  ${k_symbol ? '' : SQL_COMMENT}AND t.k_symbol = ?
  GROUP BY A3
  ORDER BY COUNT(t.trans_id)
  `;

  timer.start();
  pool.query(QUERY, [k_symbol], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

// CARDS CONTROLLERS -----------------------------------------

exports.getIssuance = (req, res) => {
  let { type, threshold, optimized } = req.query;

  const QUERY =
    optimized == 'true'
      ? `
  SELECT A3 as "Region Name", COUNT(a.account_id) as "Account Count"
  FROM 	(
    SELECT card_id, disp_id
    FROM financial.card
    ${type ? '' : SQL_COMMENT}WHERE type = ?
  ) as c
  INNER JOIN financial.disp as d1
  ON c.disp_id = d1.disp_id
  INNER JOIN financial.account as a
  ON d1.account_id = a.account_id
  INNER JOIN financial.district as d2
  ON a.district_id = d2.district_id
  GROUP BY A3
  ${threshold ? '' : SQL_COMMENT}HAVING COUNT(a.account_id) >= ?
  `
      : `
  SELECT A3 as "Region Name", COUNT(a.account_id) as "Account Count"
  FROM financial.card as c
  INNER JOIN financial.disp as d1
  ON c.disp_id = d1.disp_id
  INNER JOIN financial.account as a
  ON d1.account_id = a.account_id
  INNER JOIN financial.district as d2
  ON a.district_id = d2.district_id
  ${type ? '' : SQL_COMMENT}WHERE c.type = ?
  GROUP BY A3
  ${threshold ? '' : SQL_COMMENT}HAVING COUNT(a.account_id) >= ?
  `;

  timer.start();
  pool.query(QUERY, [type, threshold], (err, results, fields) => {
    timer.end();
    if (err) {
      console.log(err);
      res.status(500).send({ msg: 'Server error. Please try again.' });
    } else res.send({ results, duration: timer.getTimeDiff() });
  });
};

// ANALYTICS (OLAP) CONTROLLERS -----------------------------------------
exports.getDateRollup = (req, res) => {
  const QUERY = `SELECT year 'Year', quarter 'Quarter', MONTHNAME(STR_TO_DATE(month, '%m')) 'Month', day 'Day',
  SUM(transactionQuantity) 'Transaction Quantity', SUM(transactionAmount) 'Total Transaction', AVG(transactionAverage) 'Average Transaction Amount'
  FROM financial2.finances f
  INNER JOIN financial2.district di
  ON di.id = f.districtId
  INNER JOIN financial2.date da
  ON da.id = f.dateId
  GROUP BY Year, Quarter, Month, Day WITH ROLLUP
  `;

  pool.query(QUERY, [], (err, results, fields) => {
    if (err) console.log(err);
    res.send(results);
  });
};

exports.getTransactionsPerQuarter = (req, res) => {
  const quarter = req.query.quarter || 'Q1';
  console.log(quarter);
  const QUERY = `SELECT quarter 'Quarter', districtName 'District', englishName 'Transaction type',
  SUM(transactionQuantity) "Transaction Count",
  SUM(transactionAmount) 'Transaction amount',
  AVG(transactionAverage) "Average Transaction"
  
  FROM financial2.finances f
  INNER JOIN financial2.date d
  ON f.dateid = d.id
  INNER JOIN financial2.district di
  ON f.districtId = di.id
  INNER JOIN financial2.transactionType t
  ON f.transactionTypeId = t.id
  WHERE quarter = ?
  GROUP BY quarter, districtName, englishName
  ORDER BY quarter, districtName, englishName;
  `;

  pool.query(QUERY, [quarter], (err, results, fields) => {
    if (err) console.log(err);
    res.send(results);
  });
};

exports.getTransactionsPerQuartersAndDistrict = (req, res) => {
  let { quarter, district } = req.query;
  if (!quarter) quarter = ['Q1', 'Q2', 'Q3', 'Q4'];

  const QUERY = `
  SELECT quarter "Quarter", districtName "District Name",  englishName "Transaction Type",
  SUM(transactionQuantity) "Transaction Count", SUM(transactionAmount) "Transaction Amount", AVG(transactionAverage) "Average Transaction"
  FROM financial2.finances f
  INNER JOIN financial2.date da
  ON f.dateId = da.id
  INNER JOIN financial2.district d
  ON f.districtId = d.id
  INNER JOIN financial2.transactiontype t
  ON f.transactionTypeId = t.id
  WHERE QUARTER IN (?) AND districtName = ?
  GROUP BY quarter, districtName, englishName
  ORDER BY quarter, districtName, englishName
  `;

  pool.query(QUERY, [quarter, district], (err, results, fields) => {
    if (err) console.log(err);
    res.send(results);
  });
};
// HELPER CONTROLLERS -----------------------------------------

exports.getDistrictNames = (req, res) => {
  const QUERY = `
  SELECT A2
  FROM financial.district
  ORDER BY A2
  `;

  pool.query(QUERY, [], (err, results, fields) => {
    if (err) console.log(err);
    res.send(results.map(result => result.A2));
  });
};
