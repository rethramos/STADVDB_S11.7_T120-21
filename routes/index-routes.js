const express = require('express');
const { getIndex } = require('../controllers/index-controller');
const router = express.Router();

router.get('/', getIndex);

module.exports = app => {
  app.use('/', router);
};