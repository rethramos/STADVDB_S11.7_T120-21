const express = require('express');
const { renderLoanCount } = require('../controllers/loans-controller');

const router = express.Router();

router.get('/loan-count', renderLoanCount);

module.exports = app => {
  app.use('/loans', router);
};
