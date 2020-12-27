const express = require('express');
const { getIndex } = require('../controllers/index-controller');
const pool = require('../models/db');
const router = express.Router();

router.get('/', getIndex);

module.exports = app => {
  app.use('/', router);
};
