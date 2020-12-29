const express = require('express');
const {
  renderFinishedContracts, renderAccountDistrict,
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/finished-contracts', renderFinishedContracts);

router.get('/account-district', renderAccountDistrict);

module.exports = app => {
  app.use('/accounts', router);
};
