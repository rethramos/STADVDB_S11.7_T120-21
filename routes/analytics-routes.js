const express = require('express');
const router = express.Router();

router.get('/date-rollup', (req, res) => {
  res.render('analytics-date-rollup', {
    title: 'Transactions Rollup (Date to Month)',
  });
});

router.get('/date-drilldown', (req, res) => {
  res.render('analytics-date-drilldown', {
    title: 'Transactions Drilldown (Year to Quarter)',
  });
});

router.get('/transactions-per-quarter', (req, res) => {
  res.render('analytics-slice', {
    title: 'Transactions Per Quarter',
  });
});

router.get('/transactions-per-multiple-quarters-per-district', (req, res) => {
  res.render('analytics-dice', {
    title: 'Transactions On Multiple Quarters Per District',
  });
});

module.exports = app => {
  app.use('/analytics', router);
};
