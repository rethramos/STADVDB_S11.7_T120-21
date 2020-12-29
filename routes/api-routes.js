const express = require('express');
const {
  getUnemploymentRate,
  getSalary,
  getCommittedCrimes,
  getDistrictNames,
  getFinishedContracts,
  getAccountDistrict,
  getLoanCount,
  getRegionTransactions,
} = require('../controllers/api-controller');

const router = express.Router();

// DISTRICTS ROUTES -----------------------------------------

router.get('/unemployment-rate', getUnemploymentRate);
router.get('/salary', getSalary);
router.get('/committed-crimes', getCommittedCrimes);

// ACCOUNTS ROUTES -----------------------------------------

router.get('/finished-contracts', getFinishedContracts);
router.get('/account-district', getAccountDistrict);

// LOANS ROUTES -----------------------------------------

router.get('/loan-count', getLoanCount);

// HELPER ROUTES -----------------------------------------

router.get('/region-transactions', getRegionTransactions);

// HELPER ROUTES -----------------------------------------

router.get('/districts', getDistrictNames);

module.exports = app => {
  app.use('/api', router);
};
