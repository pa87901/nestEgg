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
  const { symbol } = req.body;
  // Check if the symbol on the ticket exists in the holdings table already
  Holdings.getOne(symbol)
  .then(holdingWithSymbol => {
    if (!holdingWithSymbol) {
      console.log(`Holding with symbol ${symbol} does not exist. To call the addNewHolding model method.`);
      return Holdings.addNewHolding(req.body);
    }
    console.log(`Holding with symbol ${symbol} exists. To call the addExistingHolding model method.`);
    return Holdings.updateExistingHolding(req.body);
  })
  // const payload = req.body;
  // Transactions.addTransaction(payload)
  // .then(response => {
  //   console.log('new trade:', response);
  //   const { symbol } = response;
  //   return Holdings.updateExistingHolding(symbol)
  // })
  // .then(response2 => {
  //   if (!response2) {
  //     console.log('Time to add a brand new holding', payload);
  //     // Placeholder to add a dummy lastprice
  //     return Holdings.addTrade(payload);
  //   }
  //   console.log('existing trade:', response2);
  //   return response2;
  // })
  // .then(res3 => {
  //   console.log('res3:', res3);
  //   res.status(201).send(res3);
  // })
  .then(() => {
    res.status(418).send(req.body);
  })
  .catch(err => {
    console.error('Error adding trade ticket to db.', err); // eslint-disable-line no-console
  });
});

module.exports = router;