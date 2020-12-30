const express = require('express');
const { renderIssuance } = require('../controllers/cards-controller');

const router = express.Router();

router.get('/issuance', renderIssuance);

module.exports = app => {
  app.use('/cards', router);
};
