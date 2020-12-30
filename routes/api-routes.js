const express = require('express');
const {
  getUnemploymentRate,
  getSalary,
  getCommittedCrimes,
  getDistrictNames,
  getAccountDistrict,
  getLoanCount,
  getRegionTransactions,
  getIssuance,
  getContractStatus,
} = require('../controllers/api-controller');

const router = express.Router();

// DISTRICTS ROUTES -----------------------------------------

router.get('/unemployment-rate', getUnemploymentRate);
router.get('/salary', getSalary);
router.get('/committed-crimes', getCommittedCrimes);

// ACCOUNTS ROUTES -----------------------------------------

router.get('/contract-status', getContractStatus);
router.get('/account-district', getAccountDistrict);

// LOANS ROUTES -----------------------------------------

router.get('/loan-count', getLoanCount);

// TRANSACTIONS ROUTES -----------------------------------------

router.get('/region-transactions', getRegionTransactions);

// CARDS ROUTES -----------------------------------------

router.get('/issuance', getIssuance);

// HELPER ROUTES -----------------------------------------

router.get('/districts', getDistrictNames);

module.exports = app => {
  app.use('/api', router);
};
