const express = require('express');
const {
  renderUnemploymentRate,
  renderSalary,
  renderCommittedCrimes,
} = require('../controllers/districts-controller');

const router = express.Router();

router.get('/unemployment-rate', renderUnemploymentRate);

router.get('/salary', renderSalary);

router.get('/commited-crimes', renderCommittedCrimes);

module.exports = app => {
  app.use('/districts', router);
};
