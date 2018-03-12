const express = require('express');

const router = express.Router();
const Holdings = require('../models/holdings.js');

router.get('/', (req, res) => {
  Holdings.getAll()
  .then(holdings => {
    res.status(200).send(JSON.stringify(holdings));
  })
  .catch(err => {
    console.error('Unable to get holdings from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to get holdings from db.');
  });
});

router.delete('/', (req, res) => {
  Holdings.deleteHoldings(req.body.selected)
  .then(response => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error('Unable to delete holdings from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete holdings from db.');
  });
});

module.exports = router;