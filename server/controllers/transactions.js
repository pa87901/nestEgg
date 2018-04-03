const express = require('express');

const router = express.Router();
const Transactions = require('../models/transactions');
const Holdings = require('../models/holdings');

router.get('/', (req, res) => {
  Transactions.getAll()
  .then(transactions => {
    res.status(200).send(JSON.stringify(transactions));
  })
  .catch(err => {
    console.error('Unable to get transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send([]);
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
  const payload = req.body;
  const { symbol } = payload;
  // Check if the symbol on the ticket exists in the holdings table already
  Holdings.getOne(symbol)
  .then(holdingWithSymbol => {
    if (!holdingWithSymbol) {
      console.log(`Holding with symbol ${symbol} does not exist. To call the addNewHolding model method.`);
      return Holdings.addNewHolding(payload);
    }
    console.log(`Holding with symbol ${symbol} exists. To call the addExistingHolding model method.`);
    return Holdings.updateExistingHolding(payload, holdingWithSymbol);
  })
  .then(resFromAddingHolding => {
    console.log('Holding has been added, now to add transaction:', resFromAddingHolding);
    return Transactions.addTransaction(payload);
  })
  .then(resFromAddingTransaction => {
    console.log('Transaction has been added:', resFromAddingTransaction);
    console.log('Both holding and transaction has been added. Sending back ticket response to the client.');
    res.status(418).send(payload);
  })
  .catch(err => {
    console.error('Error adding trade ticket to db.', err); // eslint-disable-line no-console
  });
});

module.exports = router;