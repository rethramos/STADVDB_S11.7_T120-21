const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('test for OLAP');
});

router.get('/transactions-per-quarter', (req, res) => {
  res.render('analytics-transactions-per-quarter', {
    title: 'Transactions per quarter',
  });
});

module.exports = app => {
  app.use('/analytics', router);
};
