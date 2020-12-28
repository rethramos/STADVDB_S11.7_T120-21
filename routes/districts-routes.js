const express = require('express');
const {
  renderUnemploymentRate,
  renderSalary,
} = require('../controllers/districts-controller');

const router = express.Router();

router.get('/unemployment-rate', renderUnemploymentRate);

router.get('/salary', renderSalary);

module.exports = app => {
  app.use('/districts', router);
};
