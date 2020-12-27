const express = require('express');
const { renderUnemploymentRate } = require('../controllers/districts-controller');
const router = express.Router();

router.get('/unemployment-rate', renderUnemploymentRate);

module.exports = app => {
  app.use('/districts', router);
};
