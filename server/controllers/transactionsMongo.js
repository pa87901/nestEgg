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
let { getAll, deleteTransactions } = require('../../database-mongodb/models/transactions');

getAll = Promise.promisify(getAll);
deleteTransactions = Promise.promisify(deleteTransactions);

router.get('/', (req, res) => {
  getAll()
  .then(transactions => {
    res.status(200).send(transactions);
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err);
    res.status(500).send([]);
  })
});

router.delete('/', (req, res) => {
  const { selected } = req.body;
  deleteTransactions(selected)
  .then(response => {
    console.log('Deleted transactions:', response);
    res.status(303).send(response);
  })
  .catch(err => {
    console.error('Unable to delete transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete transactions from db.');
  });
});

router.post('/', (req, res) => {
  // Placeholder
  res.status(418).send('Whoohoo');
})

module.exports = router;