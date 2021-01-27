const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('test for OLAP');
});

router.get('/date-rollup', (req, res) => {
  res.render('analytics-date-rollup', { title: 'Transactions - Date Rollup' });
});

router.get('/transactions-per-quarter', (req, res) => {
  res.render('analytics-slice', {
    title: 'Transactions per quarter',
  });
});

// router.get('/transactions-per-quarter-and-district', (req, res) => {
//   res.render('analytics-dice', {title: 'Transactions per quarter and district'});
// });

module.exports = app => {
  app.use('/analytics', router);
};
