const express = require('express');
const {
  getUnemploymentRate,
  getSalary,
  getCommittedCrimes,
  getDistrictNames,
  getFinishedContracts,
  getAccountDistrict,
} = require('../controllers/api-controller');

const router = express.Router();

// DISTRICTS ROUTES -----------------------------------------

router.get('/unemployment-rate', getUnemploymentRate);
router.get('/salary', getSalary);
router.get('/committed-crimes', getCommittedCrimes);

// ACCOUNTS ROUTES -----------------------------------------

router.get('/finished-contracts', getFinishedContracts);
router.get('/account-district', getAccountDistrict);

// HELPER ROUTES -----------------------------------------

router.get('/districts', getDistrictNames);

module.exports = app => {
  app.use('/api', router);
};
