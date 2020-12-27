const express = require('express');
const { getUnemploymentRate } = require('../controllers/api-controller');
const router = express.Router();

router.get('/unemployment-rate', getUnemploymentRate);

module.exports = app => {
  app.use('/api', router);
};
