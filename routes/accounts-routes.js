const express = require('express');
const {
  renderFinishedContracts,
} = require('../controllers/accounts-controller');

const router = express.Router();

router.get('/finished-contracts', renderFinishedContracts);

module.exports = app => {
  app.use('/accounts', router);
};
