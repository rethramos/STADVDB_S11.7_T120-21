const express = require('express');
const {
  renderAccountDistrict,
  renderContractStatus,
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/contract-status', renderContractStatus);

router.get('/account-district', renderAccountDistrict);

module.exports = app => {
  app.use('/accounts', router);
};
