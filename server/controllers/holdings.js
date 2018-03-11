const express = require('express');

const router = express.Router();
const Holdings = require('../models/holdings.js');

router.get('/', (req, res) => {
  console.log('Trying to get all holdings from db');
  Holdings.getAll()
  .then(holdings => {
    res.status(200).send(JSON.stringify(holdings));
  })
  .catch(err => {
    res.status(500).send('Unable to get holdings from db');
  });
});

router.delete('/', (req, res) => {
  res.status(418).send('Server got your message');
});

module.exports = router;