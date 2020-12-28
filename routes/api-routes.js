const express = require('express');
const { getUnemploymentRate, getSalary } = require('../controllers/api-controller');
const router = express.Router();

router.get('/unemployment-rate', getUnemploymentRate);
router.get('/salary', getSalary);

module.exports = app => {
  app.use('/api', router);
};
