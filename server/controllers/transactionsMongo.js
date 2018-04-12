const express = require('express');

const router = express.Router();
const { Transactions } = require('../../database-mongodb/models');

router.get('/', (req, res) => {
  Transactions.find()
  .then(transactions => {
    console.log('Transactions from mongodb:', transactions);
    res.status(200).send(JSON.stringify(transactions));
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err);
    res.status(500).send([]);
  });
});

module.exports = router;