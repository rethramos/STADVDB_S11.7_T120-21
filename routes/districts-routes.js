const express = require('express');
const {
  renderUnemploymentRate,
  renderSalary,
} = require('../controllers/districts-controller');

const router = express.Router();

router.get('/unemployment-rate', renderUnemploymentRate);

router.get('/salary', renderSalary);

router.get('/commited-crimes', (req, res) => {
  res.render('districts-commited-crimes', {
    title: 'Average Committed Crimes',
  });
});

module.exports = app => {
  app.use('/districts', router);
};
