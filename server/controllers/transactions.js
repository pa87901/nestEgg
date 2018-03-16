const express = require('express');

const router = express.Router();
const Transactions = require('../models/transactions');

router.get('/', (req, res) => {
  Transactions.getAll()
  .then(transactions => {
    res.status(200).send(JSON.stringify(transactions));
  })
  .catch(err => {
    console.error('Unable to get transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to get transactions from db.');
  });
});

router.delete('/', (req, res) => {
  Transactions.deleteTransactions(req.body.selected)
  .then(response => {
    res.status(303).send(response);
  })
  .catch(err => {
    console.error('Unable to delete transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete transactions from db.');
  });
});

router.post('/', (req, res) => {
  console.log('Transaction body:', req.body);
  Transactions.addTransaction(req.body)
  .then(response => {
    res.status(201).send(response);
    // Placeholder to add trade to overal holdings for this symbol
  })
  .catch(err => {
    console.error('Error adding trade ticket to db.', err); // eslint-disable-line no-console
  });
});

module.exports = router;