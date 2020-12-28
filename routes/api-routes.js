const express = require('express');
const {
  getUnemploymentRate,
  getSalary,
  getCommittedCrimes,
  getDistrictNames,
  getFinishedContracts,
} = require('../controllers/api-controller');

const router = express.Router();

router.get('/unemployment-rate', getUnemploymentRate);
router.get('/salary', getSalary);
router.get('/committed-crimes', getCommittedCrimes);

router.get('/finished-contracts', getFinishedContracts);

// HELPER ROUTES -----------------------------------------

router.get('/districts', getDistrictNames);

module.exports = app => {
  app.use('/api', router);
};
