const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("test for OLAP")
})
module.exports = app => {
  app.use('/analytics', router);
};
