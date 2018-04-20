const express = require('express');

const router = express.Router();

/*
const { Transactions } = require('../../database-mongodb/models');

router.get('/', (req, res) => {
  Transactions.find()
  .then(transactions => {
    // console.log('Transactions from mongodb:', transactions);
    res.status(200).send(JSON.stringify(transactions));
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err);
    res.status(500).send([]);
  });
});
*/

const Promise = require('bluebird');
let { getAll } = require('../../database-mongodb/models/transactions');

getAll = Promise.promisify(getAll);

router.get('/', (req, res) => {
  getAll()
  .then(transactions => {
    res.status(200).send(transactions);
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err);
    res.status(500).send([]);
  })
})

module.exports = router;