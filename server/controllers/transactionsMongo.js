const express = require('express');
const {
  getAllTransactions,
  deleteTransactions,
  addTransaction
} = require('../../database-mongodb/models/transactions');
const { getOneHolding, addHolding } = require('../../database-mongodb/models/holdings');


const router = express.Router();

router.get('/', (req, res) => {
  getAllTransactions()
  .then(transactions => {
    res.status(200).send(transactions);
  })
  .catch(err => {
    console.error('Unable to get transactions from mongodb.', err); // eslint-disable-line no-console
    res.status(500).send([]);
  })
});

router.delete('/', (req, res) => {
  const { selectedTransactions } = req.body;
  deleteTransactions(selectedTransactions)
  .then(response => {
    console.log('Deleted transactions:', selectedTransactions);
    res.status(303).send({ response, selectedTransactions });
  })
  .catch(err => {
    console.error('Unable to delete transactions from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete transactions from db.');
  });
});

router.post('/', (req, res) => {
  // Placeholder
  console.log('Transaction body:', req.body);
  const payload = req.body;
  const { symbol } = payload;
  // Check if the symbol on the ticket exists in the holdings table already
  getOneHolding(symbol)
  .then(holdingWithSymbol => {
    if (!holdingWithSymbol) {
      console.log(`Holding with symbol ${symbol} does not exist. To call the addNewHolding model method.`);
      return addHolding(payload);
    }
  })
  .then(resFromAddingHolding => {
    console.log('Holding has been added, now to add transaction:', resFromAddingHolding);
    return addTransaction(payload)
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