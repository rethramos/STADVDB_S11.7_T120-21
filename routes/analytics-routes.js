const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('test for OLAP');
});

router.get('/date-rollup', (req, res) => {
  res.render('analytics-date-rollup', { title: 'Transactions - Date Rollup' });
});

router.get('/date-drilldown', (req, res) => {
  res.render('analytics-date-drilldown', {
    title: 'Transactions - Date Drilldown',
  });
});

router.get('/transactions-per-quarter', (req, res) => {
  res.render('analytics-slice', {
    title: 'Transactions Per Quarter',
  });
});

router.get('/transactions-per-multiple-quarters-per-district', (req, res) => {
  res.render('analytics-dice', {
    title: 'Transactions Per Multiple Quarters Per District',
  });
});

module.exports = app => {
  app.use('/analytics', router);
};
