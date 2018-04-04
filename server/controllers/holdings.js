const express = require('express');

const router = express.Router();
const Holdings = require('../models/holdings');
const Transactions = require('../models/transactions');

router.get('/', (req, res) => {
  Holdings.getAll()
  .then(holdings => {
    res.status(200).send(JSON.stringify(holdings));
  })
  .catch(err => {
    console.error('Unable to get holdings from db.', err); // eslint-disable-line no-console
    res.status(500).send([]);
  });
});

router.get('/:symbol', (req, res) => {
  const { symbol } = req.params;
  Holdings.getOne(symbol)
  .then(response => {
    if (response === 'Symbol does not exist in the holdings table.') {
      throw new Error('Symbol not found');
    }
    res.status(200).send(response);
  })
  .catch(err => {
    console.error(`Unable to find a holding with symbol ${symbol}.`, err); // eslint-disable-line no-console
    res.status(500).send(err);
  });
});

router.delete('/', (req, res) => {
  const { selected } = req.body;
  Holdings.deleteHoldings(selected)
  .then(() => Transactions.deleteTransactions(selected))
  .then(response2 => {
    res.status(303).send(response2);
  })
  .catch(err => {
    console.error('Unable to delete holdings from db.', err); // eslint-disable-line no-console
    res.status(500).send('Unable to delete holdings from db.');
  });
});

/*
// There will no longer be a direct route to Holdings from the client to post a new trade.
// New trades go through the Transacions route.
router.post('/', (req, res) => {
  Holdings.addTrade(req.body)
  .then(response => {
    res.status(201).send(response);
  })
  .catch(err => {
    console.error('Error adding trade ticket to db.', err); // eslint-disable-line no-console
  });
});
*/

module.exports = router;