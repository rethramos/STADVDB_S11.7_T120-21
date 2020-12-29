const express = require('express');
const { renderRegionTransactions } = require('../controllers/transactions-controller');

const router = express.Router();

router.get('/region-transactions', renderRegionTransactions);

module.exports = app => {
  app.use('/transactions', router);
};
