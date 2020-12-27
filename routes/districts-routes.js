const express = require('express');
const router = express.Router();

router.get('/unemployment-rate', (req, res) => {
  res.render('districts-unemployment-rate');
});

module.exports = app => {
  app.use('/districts', router);
};
