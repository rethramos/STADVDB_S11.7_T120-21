const express = require('express');
const { renderIndex } = require('../controllers/index-controller');
const pool = require('../models/db');
const router = express.Router();

router.get('/', renderIndex);

module.exports = app => {
  app.use('/', router);
};
